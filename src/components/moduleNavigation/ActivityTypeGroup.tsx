import {type Activity, activityTypes} from "../../models/activity.ts";


interface ActivityTypeGroupProps {
    activities: Activity[];
    expandedActivityTypes: string[];
    selectedActivityId: string | null;
    onToggle: (type: string) => void;
    onSelectActivity: (activityId: string) => void;
}

export default function ActivityTypeGroup(props: ActivityTypeGroupProps) {
    return activityTypes.map(type => {
        const activities = props.activities.filter(
            activity => activity.type === type
        );

        if (activities.length === 0) {
            return null;
        }

        const isExpanded = props.expandedActivityTypes.includes(type);

        return (
            <li key={type}>
                <button
                    type="button"
                    className="flex w-full items-center gap-1 rounded px-2 py-1.5 text-left font-medium hover:bg-gray-100"
                    onClick={() => props.onToggle(type)}
                >
                    <span className="flex h-8 w-6 text-lg items-center justify-center">
                        {isExpanded ? "▾" : "▸"}
                    </span>

                    <span>{type}</span>
                </button>

                {isExpanded && (
                    <ul className="pl-6">
                        {activities.map(activity => (
                            <li key={activity.id}>
                                <button
                                    type="button"
                                    className={`w-full rounded px-3 py-2 text-left ${
                                        activity.id === props.selectedActivityId
                                            ? "bg-gray-200"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        props.onSelectActivity(activity.id)
                                    }
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
