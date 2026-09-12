import apiCall from "./apiCall.ts";
import type { AuthResponse } from "../models/authResponse.ts";

type SetAccessToken = (token: string | null) => void;

export async function authApiCall<T>(endpoint: string, accessToken: string | null, setAccessToken: SetAccessToken, options: RequestInit = {}): Promise<T | null> {

    try {
        return await apiCall<T>(endpoint, addAuthorizationHeader(options, accessToken));
    } catch (error) {
        if (!(error instanceof Error) || error.message !== "401") {
            throw error;
        }
    }

    const authResponse = await apiCall<AuthResponse>("/auth/refresh-token", {method: "POST"});
    const newAccessToken = authResponse?.accessToken ?? null;

    if (!newAccessToken) {
        setAccessToken(null);
        throw new Error("401");
    }

    setAccessToken(newAccessToken);
    return apiCall<T>(endpoint, addAuthorizationHeader(options, newAccessToken));
}

function addAuthorizationHeader(options: RequestInit, accessToken: string | null): RequestInit {
    return {
        ...options,
        headers: {
            ...options.headers,
            ...(accessToken && {
                Authorization: `Bearer ${accessToken}`
            })
        }
    };
}



