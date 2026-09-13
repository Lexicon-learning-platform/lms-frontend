import {useEffect, useState} from "react";
import ModuleNavigation from "../components/moduleNavigation/ModuleNavigation.tsx";
import { useCurrentCourse } from "../context/course/CourseContext.ts";
import {useAuth} from "../context/auth/AuthContext.ts";
import type {ModuleExtended} from "../models/moduleExtended.ts";
import {authApiCall} from "../functions/authApiCall.ts";
import Activity from "../components/Activity.tsx";

export default function Modules() {
    const { accessToken, setAccessToken } = useAuth();
    const { course } = useCurrentCourse();

    const modules = course?.modules ?? [];
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(modules[0]?.id ?? null);
    const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
    const selectedActivityModule = modules.find(module => module.activities.some(activity => activity.id === selectedActivityId));
    const selectedModule = modules.find(module => module.id === selectedModuleId);
    const [extendedModule, setExtendedModule] = useState<ModuleExtended | null>(null);


    const selectedActivity = modules
        .flatMap(module => module.activities)
        .find(activity => activity.id === selectedActivityId);

    function selectActivity(activityId: string) {
        setSelectedModuleId(null);
        setSelectedActivityId(activityId);
        setExtendedModule(null);
    }

    function selectModule(moduleId: string) {
        setSelectedModuleId(moduleId);
        setSelectedActivityId(null);
    }



    useEffect(() => {
        if (!selectedModuleId) {
            return;
        }

        async function loadModule() {
            const response = await authApiCall<ModuleExtended>(
                `/modules/${selectedModuleId}`,
                accessToken,
                setAccessToken
            );

            setExtendedModule(response);
        }

        loadModule();
    }, [selectedModuleId, accessToken, setAccessToken]);



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
                    TODO: Make something nice here...
                </h1>

                <div className="mt-6">


                    {selectedActivity && selectedActivityModule && (
                        <Activity
                            activity={selectedActivity}
                            moduleId={selectedActivityModule.id}
                        />
                    )}

                    {extendedModule &&
                        (<pre className="whitespace-pre-wrap">{JSON.stringify(extendedModule, null, 4)}</pre>)}

                    {!selectedModule && !selectedActivity && (
                        <p>Välj en modul eller aktivitet</p>
                    )}
                </div>
            </section>
        </div>
    );
}
