import { useState } from "react";
import { modules } from "../mock/modules";
import ModuleNavigation from "../components/ModuleNavigation.tsx";

export default function Modules() {
    const [selectedModuleId, setSelectedModuleId] = useState(
        modules[0]?.id ?? ""
    );

    const selectedModule = modules.find(
        module => module.id === selectedModuleId
    );

    return (
        <main className="flex min-h-[calc(100vh-120px)] p-6">
            <div className="flex-1 pr-6">
                <h1 className="text-xl font-bold">
                    Moduler
                </h1>

                <div className="mt-6">
                    {selectedModule ? (
                        <>
                            <h2 className="text-lg font-semibold">
                                {selectedModule.name}
                            </h2>

                            <p className="mt-2">
                                {selectedModule.description}
                            </p>
                        </>
                    ) : (
                        <p>Välj en modul</p>
                    )}
                </div>
            </div>

            <ModuleNavigation
                selectedModuleId={selectedModuleId}
                onSelectModule={setSelectedModuleId}
            />
        </main>
    );
}
