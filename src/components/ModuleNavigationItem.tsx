import { activityTypes } from "../models/activity";
import type { Module } from "../models/module";

interface ModuleNavigationItemProps {
    module: Module;
    isSelected: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    onSelect: () => void;
}

export default function ModuleNavigationItem({
                                                 module,
                                                 isSelected,
                                                 isExpanded,
                                                 onToggle,
                                                 onSelect
                                             }: ModuleNavigationItemProps) {
    return (
        <li>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-gray-100"
                    onClick={onToggle}
                >
                    {isExpanded ? "▾" : "▸"}
                </button>

                <button
                    type="button"
                    onClick={onSelect}
                    className={`w-full rounded px-2 py-1 text-left font-semibold ${
                        isSelected
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
}
