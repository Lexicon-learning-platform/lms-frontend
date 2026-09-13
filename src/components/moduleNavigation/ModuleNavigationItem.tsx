import { useState } from "react";
import type { Module } from "../../models/module.ts";
import ActivityTypeGroup from "./ActivityTypeGroup.tsx";



interface ModuleNavigationItemProps {
    module: Module;
    isSelected: boolean;
    isExpanded: boolean;
    selectedActivityId: string | null;
    onToggle: () => void;
    onSelect: () => void;
    onSelectActivity: (activityId: string) => void;
}

export default function ModuleNavigationItem(props: ModuleNavigationItemProps) {
    const [expandedActivityTypes, setExpandedActivityTypes] =
        useState<string[]>([]);

    function toggleActivityType(type: string) {
        setExpandedActivityTypes(current =>
            current.includes(type)
                ? current.filter(item => item !== type)
                : [...current, type]
        );
    }

    return (
        <li>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    className="flex h-8 w-8 text-lg shrink-0 items-center justify-center rounded hover:bg-gray-100"
                    onClick={props.onToggle}
                >
                    {props.isExpanded ? "▾" : "▸"}
                </button>

                <button
                    type="button"
                    onClick={props.onSelect}
                    className={`w-full rounded px-2 py-1 text-left font-semibold ${
                        props.isSelected
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                    }`}
                >
                    {props.module.name}
                </button>
            </div>

            {props.isExpanded && (
                <ul className="mt-2 space-y-1 pl-4">
                    <ActivityTypeGroup
                        activities={props.module.activities}
                        expandedActivityTypes={expandedActivityTypes}
                        selectedActivityId={props.selectedActivityId}
                        onToggle={toggleActivityType}
                        onSelectActivity={props.onSelectActivity}
                    />
                </ul>
            )}
        </li>
    );
}
