import { useState } from "react";
import { activityTypes } from "../models/activity";
import type { Module } from "../models/module";

interface ModuleNavigationItemProps {
    module: Module;
    isSelected: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    onSelect: () => void;
}

export default function ModuleNavigationItem(
    props: ModuleNavigationItemProps
) {
    const [expandedActivityTypes, setExpandedActivityTypes] =
        useState<string[]>([]);

    function toggleActivityType(type: string) {
        setExpandedActivityTypes(current =>
            current.includes(type)
                ? current.filter(item => item !== type)
                : [...current, type]
        );
    }

    function getActivitiesByType(type: string) {
        return props.module.activities.filter(
            activity => activity.activityType === type
        );
    }

    function renderActivityTypes() {

        return activityTypes.map(type => {
            const activities = getActivitiesByType(type);

            if (activities.length === 0) {
                return null;
            }

            const isCategoryExpanded =
                expandedActivityTypes.includes(type);

            return (
                <li key={type}>
                    <button
                        type="button"
                        className="flex w-full items-center gap-1 rounded px-2 py-1.5 text-left font-medium hover:bg-gray-100"
                        onClick={() => toggleActivityType(type)}
                    >
                    <span className="flex h-8 w-6 items-center justify-center">
                        {isCategoryExpanded ? "▾" : "▸"}
                    </span>

                        <span>{type}</span>
                    </button>

                    {isCategoryExpanded && (
                        <ul className="pl-6">
                            {activities.map(activity => (
                                <li key={activity.id}>
                                    <button
                                        type="button"
                                        className="w-full rounded px-3 py-2 text-left hover:bg-gray-100"
                                    >
                                        {activity.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            );
        });
    }

    return (
        <li>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-gray-100"
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
                    {renderActivityTypes()}
                </ul>
            )}

        </li>
    );
}
