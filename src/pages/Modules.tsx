import { useState } from "react";
import { modules } from "../mock/modules";
import ModuleNavigation from "../components/ModuleNavigation.tsx";

export default function Modules() {

    const [selectedModuleId, setSelectedModuleId] = useState<string | null> (modules[0]?.id ?? "");
    const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

    const selectedModule = modules.find(module => module.id === selectedModuleId);
    const selectedActivity = modules
        .flatMap(module => module.activities)
        .find(activity => activity.id === selectedActivityId);

    function selectModule(moduleId: string) {
        setSelectedModuleId(moduleId);
        setSelectedActivityId(null);
    }

    function selectActivity(activityId: string) {
        setSelectedModuleId(null);
        setSelectedActivityId(activityId);
    }

    return (
        <main className="flex min-h-[calc(100vh-120px)] p-6">
            <div className="flex-1 pr-6">
                <h1 className="text-xl font-bold">
                    Moduler
                </h1>

                <div className="mt-6">
                    {selectedModule && (
                        <>
                            <h2 className="text-lg font-semibold">
                                {selectedModule.name}
                            </h2>

                            <p className="mt-2">
                                {selectedModule.description}
                            </p>
                        </>
                    )}

                    {selectedActivity && (
                        <>
                            <h2 className="text-lg font-semibold">
                                {selectedActivity.name}
                            </h2>

                            <p className="mt-2">
                                {selectedActivity.description}
                            </p>
                        </>
                    )}

                    {!selectedModule && !selectedActivity && (
                        <p>Välj en modul eller aktivitet</p>
                    )}
                </div>
            </div>

            <ModuleNavigation
                selectedModuleId={selectedModuleId}
                selectedActivityId={selectedActivityId}
                onSelectModule={selectModule}
                onSelectActivity={selectActivity}
            />
        </main>
    );
}
