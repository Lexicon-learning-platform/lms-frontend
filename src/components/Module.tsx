import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { ModuleExtended } from "../models/moduleExtended.ts";
import Activity from "./Activity.tsx";
import DialogBase from "./DialogBase.tsx";
import Resource from "./Resource.tsx";

interface ModuleProps {
    moduleId: string;
}

export default function Module({ moduleId }: ModuleProps) {
    const { accessToken, setAccessToken } = useAuth();
    const [module, setModule] = useState<ModuleExtended | null>(null);
    const [isActivityOpen, setIsActivityOpen] = useState<boolean>(false);
    const [clickedActivity, setClickedActivity] = useState<string>("");
    const [isResourceOpen, setIsResourceOpen] = useState<boolean>(false);
    const [clickedResource, setClickedResource] = useState<string>("");

    useEffect(() => {
        async function loadModule() {
            try {
                const response = await authApiCall<ModuleExtended>(
                    `/modules/${moduleId}`,
                    accessToken,
                    setAccessToken,
                );

                setModule(response);
            } catch (error) {
                console.error("Failed to load module", error);
            }
        }

        loadModule();
    }, [moduleId, accessToken, setAccessToken]);

    if (!module) {
        return <p>Loading module...</p>;
    }

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold mb-4">{module.name}</h2>
                <p className="mb-2">{module.description}</p>
                <div>
                    Längd: {module.duration} dag
                    {module.duration > 1 ? "ar" : ""}
                </div>
            </div>
            <hr className="my-8" />
            <div>
                <div className="flex flex-col md:flex-row justify-center md:justify-between">
                    <h3 className="text-xl font-semibold mb-4">Aktiviteter</h3>
                    <div>{/* insert pagination component</div> */}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {module.activities.length > 0 ? (
                        module.activities
                            .sort((a, b) => a.startOffset - b.startOffset)
                            .map((a) => (
                                <div
                                    key={a.id}
                                    className="w-full border border-black rounded-lg p-1.5"
                                    onClick={() => {
                                        setClickedActivity(a.id);
                                        setIsActivityOpen(!isActivityOpen);
                                    }}
                                >
                                    <h4 className="font-semibold text-nowrap">
                                        {a.name}
                                    </h4>
                                    <p className="text-nowrap">Typ: {a.type}</p>
                                    <p className="text-nowrap">
                                        Längd: {a.duration} minuter
                                    </p>
                                </div>
                            ))
                    ) : (
                        <span>Inga aktiviteter registrerade</span>
                    )}
                </div>
            </div>
            {isActivityOpen && (
                <DialogBase
                    onClose={() => {
                        setClickedActivity("");
                        setIsActivityOpen(false);
                    }}
                >
                    <h3
                        id="dialog-title"
                        className="w-full text-center text-2xl mb-4"
                    >
                        Aktivitestdetaljer
                    </h3>
                    <Activity
                        moduleId={module.id}
                        activityId={clickedActivity}
                    />
                </DialogBase>
            )}
            <hr className="my-8" />
            <div>
                <div className="flex flex-col md:flex-row justify-center md:justify-between">
                    <h3 className="text-xl font-semibold mb-4">Resurser</h3>
                    <div>{/* insert pagination component */}</div>
                </div>
                <div className="">
                    {module.resources.length > 0 ? (
                        module.resources.map((r) => (
                            <div
                                key={r.id}
                                className="border border-black rounded-lg p-1.5 mb-3"
                                onClick={() => {
                                    setClickedResource(r.id);
                                    setIsResourceOpen(!isResourceOpen);
                                }}
                            >
                                <h4 className="font-semibold">{r.name}</h4>
                                <p>{r.description}</p>
                                <p>Typ: {r.type}</p>
                            </div>
                        ))
                    ) : (
                        <span>Inga resurser registrerade</span>
                    )}
                </div>
            </div>
            {isResourceOpen && (
                <DialogBase
                    onClose={() => {
                        setClickedResource("");
                        setIsResourceOpen(false);
                    }}
                >
                    <h3
                        id="dialog-title"
                        className="w-full text-center text-2xl mb-4"
                    >
                        Resursdetaljer
                    </h3>
                    <Resource resourceId={clickedResource} />
                </DialogBase>
            )}
        </div>
    );
}
