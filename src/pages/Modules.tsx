import { useState } from "react";
import ModuleNavigation from "../components/ModuleNavigation.tsx";
import { useCurrentCourse } from "../context/course/CourseContext.ts";

export default function Modules() {
    const { course } = useCurrentCourse();

    const modules = course?.modules ?? [];

    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(
        modules[0]?.id ?? null
    );
    const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

    const selectedModule = modules.find(
        module => module.id === selectedModuleId
    );

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
            <aside className="md:order-2 md:col-span-3 h-full w-64 border-l p-4">
                <ModuleNavigation
                    modules={modules}
                    selectedModuleId={selectedModuleId}
                    selectedActivityId={selectedActivityId}
                    onSelectModule={selectModule}
                    onSelectActivity={selectActivity}
                />
            </aside>

            <section className="md:order-1 md:col-span-9 space-y-6 h-full">
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
                                {selectedActivity.type}
                            </p>
                        </>
                    )}

                    {!selectedModule && !selectedActivity && (
                        <p>Välj en modul eller aktivitet</p>
                    )}
                </div>
            </section>
        </div>
    );
}
