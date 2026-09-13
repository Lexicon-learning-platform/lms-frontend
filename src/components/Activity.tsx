import { useEffect, useState } from "react";
import type { Activity } from "../models/activity.ts";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";

interface ActivityContentProps {
    moduleId: string;
    activity: Activity;
}

export default function Activity({ moduleId, activity }: ActivityContentProps) {
    const { accessToken, setAccessToken } = useAuth();
    const [detailedActivity, setDetailedActivity] = useState<Activity | null>(null);

    useEffect(() => {
        async function loadActivity() {
            try {
                const response = await authApiCall<Activity>(
                    `/modules/${moduleId}/activities/${activity.id}`,
                    accessToken,
                    setAccessToken
                );

                console.log("activity response", response);

                setDetailedActivity(response);
            } catch (error) {
                console.error("Failed to load activity", error);
            }
        }

        loadActivity();
    }, [activity.id, accessToken, setAccessToken, moduleId]);

    return (
        <pre className="whitespace-pre-wrap">
            {JSON.stringify(detailedActivity, null, 4)}
        </pre>
    );
}
