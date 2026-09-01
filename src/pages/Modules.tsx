

export interface Activity {
    id: string;
    activityType: ActivityType;
    name: string | null;
    description: string | null;
    startTimeOffset: number;
    durationMinutes: number;
}

export interface Module {
    id: string;
    name: string | null;
    description: string | null;
    durationDays: number | null;
    activities: Activity[];
}

export type ActivityType =
    | "Elearn"
    | "Lecture"
    | "Exercise"
    | "Assignment"
    | "Other";




export default function Modules() {
    return (
        <main className="flex p-6">
            <div className="flex-1">
                <h1 className="text-xl font-bold">
                    Moduler
                </h1>

                <div>
                    Main container...
                </div>
            </div>

            <aside className="w-64 border-l p-4">
                <h2 className="font-semibold">
                    Kursnavigation
                </h2>

                <div>
                    navbar for modules...
                </div>
            </aside>
        </main>
    );
}
