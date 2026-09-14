import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { type Resource } from "../models/resource";
import { authApiCall } from "../functions/authApiCall";

interface Props {
    resourceId: string;
}

export default function ResourceDetail({ resourceId }: Props) {
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

    if (!detailedResource) return <p>Loading resource...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-8">{detailedResource.name}</h2>
            <p>{detailedResource.description}</p>
            <hr className="my-8" />
            <p>{detailedResource.data}</p>
        </div>
    );
}
