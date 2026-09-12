import { useState } from "react";
import ModuleNavigationItem from "./ModuleNavigationItem";
import type { Module } from "../models/module";

interface ModuleNavigationProps {
    modules: Module[];
    selectedModuleId: string | null;
    selectedActivityId: string | null;
    onSelectModule: (moduleId: string) => void;
    onSelectActivity: (activityId: string) => void;
}

export default function ModuleNavigation(props: ModuleNavigationProps) {
    const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([]);

    const toggleModule = (moduleId: string) => {
        setExpandedModuleIds(current =>
            current.includes(moduleId)
                ? current.filter(id => id !== moduleId)
                : [...current, moduleId]
        );
    };

    return (
        <nav className="mt-4">
            <ul className="space-y-4">
                {props.modules.map(module => (
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
    );
}
