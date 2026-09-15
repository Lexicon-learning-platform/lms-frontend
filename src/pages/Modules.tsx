import { useState } from "react";
import ModuleNavigation from "../components/moduleNavigation/ModuleNavigation.tsx";
import { useCurrentCourse } from "../context/course/CourseContext.ts";
import Activity from "../components/Activity.tsx";
import Module from "../components/Module.tsx";
import type { Module as ModuleModel } from "../models/module.ts";

export default function Modules() {
    const { course } = useCurrentCourse();

    return <ModulesForCourse key={course?.id ?? "none"} modules={course?.modules ?? []} />;
}

interface ModulesForCourseProps {
    modules: ModuleModel[];
}

function ModulesForCourse({ modules }: ModulesForCourseProps) {
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(modules[0]?.id ?? null);
    const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

    const selectedActivity = modules
        .flatMap(module => module.activities)
        .find(activity => activity.id === selectedActivityId);

    const selectedActivityModule = modules.find(module =>
        module.activities.some(activity => activity.id === selectedActivityId)
    );

    const selectModule = (moduleId: string) => {
        setSelectedModuleId(moduleId);
        setSelectedActivityId(null);
    };

    const selectActivity = (activityId: string) => {
        setSelectedModuleId(null);
        setSelectedActivityId(activityId);
    };

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


                <div className="mt-6">
                    {selectedModuleId && (
                        <Module moduleId={selectedModuleId} />
                    )}

                    {selectedActivity && selectedActivityModule && (
                        <Activity
                            activityId={selectedActivity.id}
                            moduleId={selectedActivityModule.id}
                        />
                    )}

                    {!selectedModuleId && !selectedActivity && (
                        <p>Välj en modul eller aktivitet</p>
                    )}
                </div>
            </section>
        </div>
    );
}
