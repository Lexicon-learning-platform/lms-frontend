import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { ActivityExtended } from "../models/activityExtended.ts";
import DialogBase from "./DialogBase.tsx";
import Resource from "./Resource.tsx";

interface ActivityContentProps {
    moduleId: string;
    activityId: string;
}

export default function Activity({
    moduleId,
    activityId,
}: ActivityContentProps) {
    const { accessToken, setAccessToken } = useAuth();
    const [detailedActivity, setDetailedActivity] =
        useState<ActivityExtended | null>(null);
    const [isResourceOpen, setIsResourceOpen] = useState<boolean>(false);
    const [clickedResource, setClickedResource] = useState<string>("");

    useEffect(() => {
        async function loadActivity() {
            try {
                const response = await authApiCall<ActivityExtended>(
                    `/modules/${moduleId}/activities/${activityId}`,
                    accessToken,
                    setAccessToken,
                );

                console.log("activity response", response);

                setDetailedActivity(response);
            } catch (error) {
                console.error("Failed to load activity", error);
            }
        }

        loadActivity();
    }, [activityId, accessToken, setAccessToken, moduleId]);

    if (!detailedActivity) return <p>Loading activity...</p>;
    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold mb-8">
                    {detailedActivity.name}
                </h2>
                <p className="text-nowrap">
                    Längd: {detailedActivity.duration} dag
                    {detailedActivity.duration > 1 ? "ar" : ""}
                </p>
            </div>
            <p>{detailedActivity.description}</p>
            <hr className="my-8" />
            <div>
                {detailedActivity.resources.length > 0 ? (
                    detailedActivity.resources.map((r) => (
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
