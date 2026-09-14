import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import type { ActivityExtended } from "../models/activityExtended.ts";
import ResourceList from "./ResourceList.tsx";

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
                    Längd: {detailedActivity.duration} minuter
                </p>
            </div>
            <p>{detailedActivity.description}</p>
            <hr className="my-8" />
            <ResourceList resources={detailedActivity.resources} />
        </div>
    );
}
