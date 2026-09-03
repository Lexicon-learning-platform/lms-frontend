import {useState} from "react";
import {modules} from "../mock/modules";

export default function Modules() {

    const [selectedModuleId, setSelectedModuleId] = useState(modules[0]?.id ?? "");
    const selectedModule = modules.find(module => module.id === selectedModuleId);
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
