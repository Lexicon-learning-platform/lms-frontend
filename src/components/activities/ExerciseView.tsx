

import type { Activity } from "../../models/activity";

export default function ExerciseView({ activity }: { activity: Activity }) {
    return (
        <div>
            <h2 className="text-lg font-semibold">
                {activity.name}
            </h2>

            <p className="mt-2">
                {activity.description}
            </p>

            <p className="mt-4">
                Övning
            </p>
        </div>
    );
}
