import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { type Resource } from "../models/resource";
import { authApiCall } from "../functions/authApiCall";

interface Props {
    resourceId: string;
}

export default function Resource({ resourceId }: Props) {
    const { accessToken, setAccessToken } = useAuth();
    const [detailedResource, setDetailedResource] = useState<Resource | null>(
        null,
    );

    useEffect(() => {
        async function loadResource() {
            try {
                const response = await authApiCall<Resource>(
                    `/resources/${resourceId}`,
                    accessToken,
                    setAccessToken,
                );

                console.log("Resource response:", response);
                setDetailedResource(response);
            } catch (error) {
                console.log("Failed to load resource", error);
            }
        }

        loadResource();
    }, [resourceId, accessToken, setAccessToken]);

    return (
        <pre className="whitespace-pre-wrap">
            {JSON.stringify(detailedResource, null, 4)}
        </pre>
    );
}
