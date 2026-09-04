import { useState } from "react";
import { modules } from "../mock/modules";
import ModuleNavigationItem from "./ModuleNavigationItem";

interface ModuleNavigationProps {
    selectedModuleId: string | null;
    selectedActivityId: string | null;
    onSelectModule: (moduleId: string) => void;
    onSelectActivity: (activityId: string) => void;
}

export default function ModuleNavigation(props: ModuleNavigationProps) {
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
                    {modules.map(module => (
                        <ModuleNavigationItem
                            key={module.id}
                            module={module}
                            isSelected={module.id === props.selectedModuleId}
                            selectedActivityId={props.selectedActivityId}
                            isExpanded={expandedModuleIds.includes(module.id)}
                            onToggle={() => toggleModule(module.id)}
                            onSelect={() => props.onSelectModule(module.id)}
                            onSelectActivity={props.onSelectActivity}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
