"use client";

import React, { useState } from "react";
import { useEditorStore, ComponentData } from "@/store/useEditorStore";
import { 
  GripVertical, 
  Settings, 
  Plus, 
  Trash2, 
  Save, 
  Layout, 
  Type, 
  Palette,
  ChevronRight,
  ChevronDown
} from "lucide-react";

export const SidebarEditor: React.FC = () => {
  const { 
    components, 
    config, 
    updateComponentProps, 
    removeComponent,
    domain,
    slug 
  } = useEditorStore();
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const selectedComponent = components.find((c) => c.id === selectedId);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call to json-server
      const pageId = useEditorStore.getState().pageId;
      const data = {
        domain,
        slug,
        config,
        components
      };
      
      const res = await fetch(`http://localhost:3001/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Changes saved successfully!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving changes. Is the mock server running?");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 h-full flex flex-col shadow-xl z-20">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Editor</h2>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">
            {domain} / {slug}
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-all shadow-lg shadow-blue-100"
          title="Save Changes"
        >
          <Save size={20} className={isSaving ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Site Config Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-gray-900">
            <Settings size={18} className="text-blue-600" />
            <h3 className="font-bold text-sm uppercase tracking-widest">Site Config</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Site Title</label>
              <input 
                type="text" 
                value={config?.metadata.title || ""} 
                readOnly 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Navigator Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-900">
              <Layout size={18} className="text-blue-600" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Navigator</h3>
            </div>
            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-1">
            {components.map((comp) => (
              <div 
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  selectedId === comp.id 
                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm" 
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={selectedId === comp.id ? "text-blue-500" : "text-gray-400"}>
                    {selectedId === comp.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                  <span className="text-sm font-semibold">{comp.type}</span>
                </div>
                {!comp.isLocked && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeComponent(comp.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Inspector Section */}
        {selectedComponent && (
          <section className="pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-900">
              <Palette size={18} className="text-blue-600" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Inspector</h3>
            </div>
            
            <div className="space-y-6">
              {Object.keys(selectedComponent.props).map((propKey) => (
                <div key={propKey}>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">{propKey}</label>
                  {typeof selectedComponent.props[propKey] === "string" ? (
                    <input 
                      type="text" 
                      value={selectedComponent.props[propKey]}
                      onChange={(e) => updateComponentProps(selectedComponent.id, { [propKey]: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                    />
                  ) : (
                    <div className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-xl">
                      Nested properties not editable yet
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
};
