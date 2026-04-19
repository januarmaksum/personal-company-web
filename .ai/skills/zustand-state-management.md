---
name: zustand-state-management
description: Type-safe global state management for React with persist, devtools, and Next.js SSR support. Focuses on preventing hydration mismatches and infinite render loops in Next.js applications.
license: MIT
---

# Zustand State Management

Type-safe global state management for React with persist, devtools, and Next.js SSR support.

## Quick Start

```bash
npm install zustand
```

### TypeScript Store (CRITICAL: use `create<T>()()` double parentheses)

```typescript
import { create } from 'zustand'

interface BearStore {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearStore>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
```

### Use in Components

```typescript
const bears = useBearStore((state) => state.bears) // Only re-renders when bears changes
const increase = useBearStore((state) => state.increase)
```

## Core Patterns

### Persistent Store (survives page reloads)

```typescript
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create<UserPreferences>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => localStorage)
    },
  ),
)
```

## Best Practices

### ✅ Always Do
- Use `create<T>()()` (double parentheses) in TypeScript for middleware compatibility.
- Define separate interfaces for state and actions.
- Use selector functions to extract specific state slices.
- Use `set` with updater functions: `set((state) => ({ count: state.count + 1 }))`.
- Use unique names for persist middleware storage keys.
- Handle Next.js hydration with `hasHydrated` flag pattern.
- Use `useShallow` hook for selecting multiple values.

### ❌ Never Do
- Use `create<T>(...)` (single parentheses) in TypeScript - breaks middleware types.
- Mutate state directly: `set((state) => { state.count++; return state })` - use immutable updates.
- Create new objects in selectors: `useStore((state) => ({ a: state.a }))` - causes infinite renders.
- Access `localStorage` during SSR without hydration check.
- Use Zustand for server state - use TanStack Query instead.

## Common Issues & Solutions

### 1. Next.js Hydration Mismatch
Persist middleware reads from `localStorage` on client but not on server, causing state mismatch.

**Solution: Hydration Flag Pattern**

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreWithHydration {
  count: number
  _hasHydrated: boolean
  setHasHydrated: (hydrated: boolean) => void
  increase: () => void
}

const useStore = create<StoreWithHydration>()(
  persist(
    (set) => ({
      count: 0,
      _hasHydrated: false,
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      increase: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'my-store',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

// In component
function MyComponent() {
  const hasHydrated = useStore((state) => state._hasHydrated)
  
  if (!hasHydrated) {
    return <div>Loading...</div>
  }
  
  return <ActualContent />
}
```

### 2. Infinite Render Loop
Creating new object references in selectors causes Zustand to think state changed.

**Solution: `useShallow`**

```typescript
import { useShallow } from 'zustand/shallow'

// ❌ WRONG - Creates new object every time
const { bears, fishes } = useStore((state) => ({
  bears: state.bears,
  fishes: state.fishes,
}))

// ✅ CORRECT - Use useShallow hook
const { bears, fishes } = useStore(
  useShallow((state) => ({
    bears: state.bears,
    fishes: state.fishes
  }))
)
```

## Middleware

- **Devtools**: Use `devtools` from `zustand/middleware` for Redux DevTools integration.
- **Immer**: Use `immer` from `zustand/middleware/immer` for mutable-style updates.

```typescript
import { devtools, persist } from 'zustand/middleware'

const useStore = create<MyStore>()(
  devtools(
    persist(
      (set) => ({ /* ... */ }),
      { name: 'storage' }
    ),
    { name: 'MyStore' }
  )
)
```
