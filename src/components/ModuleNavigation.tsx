import { useState } from "react";
import {activityTypes} from "../models/activity.ts";
import {modules} from "../mock/modules.ts";


interface ModuleNavigationProps {
    selectedModuleId: string;
    onSelectModule: (moduleId: string) => void;
}

export default function ModuleNavigation({selectedModuleId, onSelectModule}: ModuleNavigationProps) {

    const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([]);

    function toggleModule(moduleId: string) {
        setExpandedModuleIds(current =>
            current.includes(moduleId)
                ? current.filter(id => id !== moduleId)
                : [...current, moduleId]
        );
    }

    return (
        <aside className="w-64 border-l p-4">
            <nav className="mt-4">
                <ul className="space-y-4">
                    {modules.map(module => {
                        const isSelectedModule =
                            module.id === selectedModuleId;

                        const isExpanded =
                            expandedModuleIds.includes(module.id);

                        return (
                            <li key={module.id}>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-gray-100"
                                        onClick={() => toggleModule(module.id)}
                                    >
                                        {isExpanded ? "▾" : "▸"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onSelectModule(module.id)
                                        }
                                        className={`w-full rounded px-2 py-1 text-left font-semibold ${
                                            isSelectedModule
                                                ? "bg-gray-200"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        {module.name}
                                    </button>
                                </div>

                                {isExpanded && (
                                    <ul className="mt-2 space-y-1 pl-4">
                                        {activityTypes.map(type => (
                                            <li key={type}>
                                                <button
                                                    type="button"
                                                    className="flex w-full items-center gap-1 rounded px-2 py-1 text-left hover:bg-gray-100"
                                                >
                                                    <span className="flex h-8 w-6 items-center justify-center">
                                                        ▸
                                                    </span>

                                                    <span>{type}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
