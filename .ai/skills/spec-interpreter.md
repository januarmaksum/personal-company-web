---
name: spec-interpreter
description: Translate PRDs, planning documents, ERDs, wireframes, and technical specifications into working frontend code. Use this skill whenever the user pastes or references a PRD, product requirements document, feature spec, database schema, ERD, API contract, user stories, acceptance criteria, or any structured planning document that needs to be converted into implementation. Also use when user says "implement this", "build this spec", "translate this plan", or provides a structured document to code from.
---

# Spec Interpreter — PRD/ERD/Plan to Code

Transform structured specifications into production-ready frontend code. This skill bridges the gap between planning documents and implementation.

## Supported Input Formats

| Format | What to Extract |
|---|---|
| **PRD** (Product Requirements Document) | Features, user stories, acceptance criteria, UI requirements |
| **ERD** (Entity Relationship Diagram) | Data models, relationships, TypeScript interfaces/types |
| **API Contract / Swagger / OpenAPI** | Service functions, request/response types, API hooks |
| **User Stories** | Component breakdown, user flows, interaction patterns |
| **Wireframes / Mockups** (text or image) | Layout structure, component hierarchy, responsive behavior |
| **Technical Spec** | Architecture decisions, tech stack, data flow |
| **Feature Spec** | Specific feature scope, edge cases, validation rules |
| **Database Schema / SQL** | TypeScript types, Zod schemas, form validation |

---

## Interpretation Process

### Phase 1: Parse & Understand

Read the entire document first. Extract and organize:

#### 1. Data Models
```
From the spec, identify:
- Entities and their attributes
- Data types for each attribute
- Relationships (1:1, 1:N, N:M)
- Required vs optional fields
- Validation rules and constraints
- Default values
- Enums and constant values
```

#### 2. Features & User Stories
```
From the spec, identify:
- Core features (must-have)
- Secondary features (nice-to-have)
- User roles and permissions
- User flows (step by step)
- Acceptance criteria per feature
- Edge cases mentioned
```

#### 3. UI Requirements
```
From the spec, identify:
- Pages/screens listed
- Components mentioned
- Navigation structure
- Form fields and validation
- Tables/lists and their columns
- Modals/dialogs
- Status indicators
- Responsive requirements
```

#### 4. API Endpoints
```
From the spec, identify:
- Endpoints (method + path)
- Request params/body
- Response shape
- Error cases
- Authentication requirements
- Pagination patterns
```

### Phase 2: Present Implementation Plan

Before writing code, present this to the user:

```markdown
## Implementation Plan

### Data Models Identified
- [ ] Model A (fields: x, y, z)
- [ ] Model B (fields: a, b, c)
- Relationship: A has many B

### Pages to Build
1. Page A — description, key components
2. Page B — description, key components

### Components to Create
- ComponentX (used in: Page A, Page B)
- ComponentY (used in: Page A)

### API Integration
- GET /api/resource → useResource hook
- POST /api/resource → useCreateResource mutation

### Questions / Ambiguities
- [ ] Question about unclear requirement X
- [ ] Missing info about Y
```

**Always ask clarifying questions before implementing ambiguous requirements.**

### Phase 3: Generate Code Artifacts

Generate in this order (dependencies first):

#### Step 1: Types & Interfaces
```typescript
// types/models.ts — from ERD/data models
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export type UserRole = 'admin' | 'editor' | 'viewer';
```

#### Step 2: API Service Layer
```typescript
// services/users/fetch.ts — from API contracts
export async function getUsers(params: GetUsersParams): Promise<User[]> { ... }
export async function createUser(data: CreateUserInput): Promise<User> { ... }
```

#### Step 3: React Query Hooks
```typescript
// services/users/hooks.ts — from API layer
export function useUsers(params: GetUsersParams) { ... }
export function useCreateUser() { ... }
```

#### Step 4: Validation Schemas
```typescript
// lib/validations/user.ts — from constraints in spec
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'editor', 'viewer']),
});
```

#### Step 5: UI Components
Build components based on extracted UI requirements, following the `frontend-design` skill for aesthetics.

#### Step 6: Pages & Layouts
Compose components into full pages with routing, loading states, and error handling.

---

## Translation Rules

### ERD → TypeScript

| ERD Concept | TypeScript Output |
|---|---|
| Entity | `interface` or `type` |
| Attribute | Property with type |
| Primary Key | `id: string` (or `number`) |
| Foreign Key | `entityId: string` + relation type |
| 1:N Relation | Array property: `posts: Post[]` |
| N:M Relation | Junction table or array of IDs |
| NOT NULL | Required property |
| NULLABLE | Optional: `property?: Type` |
| ENUM | Union type or `enum` |
| TIMESTAMP | `Date` or `string` (ISO) |
| JSON/JSONB | Typed interface |
| DEFAULT value | Noted in JSDoc comment |

### PRD User Story → Component

| Story Element | Code Output |
|---|---|
| "User can see..." | Read-only display component |
| "User can create..." | Form component + create mutation |
| "User can edit..." | Form component (pre-filled) + update mutation |
| "User can delete..." | Delete button + confirmation dialog + delete mutation |
| "User can search..." | Search input + filtered list |
| "User can filter..." | Filter controls + query params |
| "User can sort..." | Sortable table headers |
| "User can export..." | Export button + download handler |
| "Admin can..." | Role-gated component or route |

### API Contract → Service Layer

| API Spec | Code Output |
|---|---|
| `GET /resources` | `useQuery` hook + fetch function |
| `GET /resources/:id` | `useQuery` hook with param |
| `POST /resources` | `useMutation` hook + post function |
| `PUT /resources/:id` | `useMutation` hook + put function |
| `DELETE /resources/:id` | `useMutation` hook + delete function |
| `GET /resources?page=` | `useInfiniteQuery` or paginated `useQuery` |
| Request body | Zod schema + TypeScript input type |
| Response body | TypeScript response type |
| Error responses | Error type union |

---

## Handling Ambiguity

When the spec is unclear or incomplete:

1. **Identify the gap** — What information is missing?
2. **State your assumption** — "I'm assuming X because..."
3. **Ask if critical** — If the assumption could significantly affect implementation, ask the user
4. **Mark with TODO** — For non-critical gaps, add `// TODO: Clarify with PM — [question]`

### Common Ambiguities

| Gap | Default Assumption |
|---|---|
| No pagination specified | Implement cursor-based pagination for lists > 20 items |
| No error handling mentioned | Add toast notifications + inline validation |
| No loading states described | Add skeleton UI for data fetching |
| No responsive spec | Mobile-first with breakpoints at 640px, 768px, 1024px, 1280px |
| No auth requirement stated | Assume authenticated routes, ask to confirm |
| No form validation rules | Derive from data types (email → email validation, etc.) |
| Unclear field optionality | Assume required unless obviously optional |

---

## Output Quality Checklist

After generating code from a spec, verify:

- [ ] All entities from ERD have corresponding TypeScript types
- [ ] All API endpoints have service functions and hooks
- [ ] All user stories have corresponding UI components
- [ ] All form fields have proper validation
- [ ] All CRUD operations are covered
- [ ] Loading, error, and empty states are handled
- [ ] Types are consistent across layers (API ↔ hooks ↔ components)
- [ ] No orphaned types or unused imports
- [ ] Component naming follows project conventions
- [ ] File structure follows project conventions
