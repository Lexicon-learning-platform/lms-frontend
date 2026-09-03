import {useState} from "react";
import {modules} from "../mock/modules";
import ActivityContent from "../components/activities/ActivityContent.tsx";

export default function Modules() {

    const [selectedModuleId, setSelectedModuleId] = useState(modules[0]?.id ?? "");
    const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);


    const selectedModule = modules.find(module => module.id === selectedModuleId);
    const selectedActivity = selectedModule?.activities.find(activity => activity.id === selectedActivityId);

    const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([]);


    function toggleModule(moduleId: string) {
        setExpandedModuleIds(current =>
            current.includes(moduleId)
                ? current.filter(id => id !== moduleId)
                : [...current, moduleId]
        );
    }


    return (
        <main className="flex min-h-[calc(100vh-120px)] p-6">
            <div className="flex-1 pr-6">
                <h1 className="text-xl font-bold">
                    Moduler
                </h1>

                <div className="mt-6">
                    {selectedActivity ? (
                        <ActivityContent activity={selectedActivity}/>
                    ) : selectedModule ? (
                        <>
                            <h2 className="text-lg font-semibold">
                                {selectedModule.name}
                            </h2>

                            <p className="mt-2">
                                {selectedModule.description}
                            </p>
                        </>
                    ) : null}
                </div>
            </div>

            <aside className="w-64 border-l p-4">


                <nav className="mt-4">
                    <ul className="space-y-4">
                        {modules.map(module => {
                            const isSelectedModule =
                                module.id === selectedModuleId;

                            return (
                                <li key={module.id}>

                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-gray-100"
                                            onClick={() => toggleModule(module.id)}
                                        >
                                            {expandedModuleIds.includes(module.id) ? "▾" : "▸"}

                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedModuleId(module.id);
                                                setSelectedActivityId(null);
                                            }}
                                            className={`w-full rounded px-2 py-1 text-left font-semibold ${
                                                isSelectedModule
                                                    ? "bg-gray-200"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            {module.name}
                                        </button>
                                    </div>

                                    {expandedModuleIds.includes(module.id) && (


                                        <ul className="mt-2 space-y-1 pl-4">
                                            {module.activities.map(activity => {
                                                const isSelectedActivity = activity.id === selectedActivityId;


                                                return (
                                                    <li key={activity.id}>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedModuleId(module.id);
                                                                setSelectedActivityId(activity.id);
                                                            }}
                                                            className={`w-full rounded px-2 py-1 text-left text-sm ${
                                                                isSelectedActivity
                                                                    ? "bg-gray-200 font-semibold"
                                                                    : "hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {activity.name}
                                                        </button>
                                                    </li>
                                                )


                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </main>
    );
}
