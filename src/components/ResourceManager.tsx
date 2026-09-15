import { useEffect, useState } from "react";
import Button from "./Button.tsx";
import ErrorMessage from "./Error.tsx";
import { useAuth } from "../context/auth/AuthContext.ts";
import { authApiCall } from "../functions/authApiCall.ts";
import { resourceTypes, type Resource, type ResourceType } from "../models/resource.ts";

interface ResourceManagerProps {
    resourcesEndpoint: string;
}

export default function ResourceManager({ resourcesEndpoint }: ResourceManagerProps) {
    const { accessToken, setAccessToken } = useAuth();

    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [resources, setResources] = useState<Resource[]>([]);
    const [selectedResourceId, setSelectedResourceId] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<ResourceType>(resourceTypes[0]);
    const [data, setData] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function fetchResources() {
            try {
                const result = await authApiCall<Resource[]>(
                    resourcesEndpoint,
                    accessToken,
                    setAccessToken,
                    { method: "GET" }
                );

                if (isMounted) setResources(result ?? []);
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Kunde inte hämta resurser");
                }
            }
        }

        fetchResources();

        return () => {
            isMounted = false;
        };
    }, [updateTrigger, resourcesEndpoint, accessToken, setAccessToken]);

    function resetForm() {
        setName("");
        setDescription("");
        setType(resourceTypes[0]);
        setData("");
    }

    function selectResource(resourceId: string) {
        setSelectedResourceId(resourceId);

        if (!resourceId) {
            resetForm();
            return;
        }

        const resource = resources.find(r => r.id === resourceId);
        setName(resource?.name ?? "");
        setDescription(resource?.description ?? "");
        setType(resource?.type ?? resourceTypes[0]);
        setData(resource?.data ?? "");
    }

    function startNewResource() {
        selectResource("");
    }

    async function saveResource() {
        setError("");

        const payload = { name, description, type, data };

        try {
            if (selectedResourceId) {
                await authApiCall(
                    `${resourcesEndpoint}/${selectedResourceId}`,
                    accessToken,
                    setAccessToken,
                    { method: "PUT", body: JSON.stringify(payload) }
                );
            } else {
                await authApiCall(
                    resourcesEndpoint,
                    accessToken,
                    setAccessToken,
                    { method: "POST", body: JSON.stringify(payload) }
                );
            }

            setUpdateTrigger(Date.now());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunde inte spara resursen");
        }
    }

    async function deleteResource() {
        if (!selectedResourceId) return;
        if (!window.confirm(`Ta bort resursen "${name}"? Det går inte att ångra.`)) return;

        setError("");

        try {
            await authApiCall(
                `${resourcesEndpoint}/${selectedResourceId}`,
                accessToken,
                setAccessToken,
                { method: "DELETE" }
            );

            startNewResource();
            setUpdateTrigger(Date.now());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunde inte ta bort resursen");
        }
    }

    const selectedResource = resources.find(r => r.id === selectedResourceId);

    return (
        <div className="flex flex-col gap-3 text-sm">
            <label className="flex flex-col gap-1" htmlFor="resourceSelect">
                Välj resurs att redigera
                <select
                    id="resourceSelect"
                    className="bg-slate-100 border border-slate-700 rounded-lg p-2"
                    value={selectedResourceId}
                    onChange={e => selectResource(e.target.value)}
                >
                    <option value="">Ny resurs...</option>
                    {resources.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1" htmlFor="resourceName">
                Namn
                <input
                    id="resourceName"
                    className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>

            <label className="flex flex-col gap-1" htmlFor="resourceDescription">
                Beskrivning
                <textarea
                    id="resourceDescription"
                    className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </label>

            <label className="flex flex-col gap-1" htmlFor="resourceType">
                Typ
                <select
                    id="resourceType"
                    className="bg-slate-100 border border-slate-700 rounded-lg p-2"
                    value={type}
                    onChange={e => setType(e.target.value as ResourceType)}
                >
                    {resourceTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1" htmlFor="resourceData">
                Innehåll / URL
                <textarea
                    id="resourceData"
                    className="bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500"
                    value={data}
                    onChange={e => setData(e.target.value)}
                />
            </label>

            {selectedResource && (
                <p className="text-xs text-slate-500">
                    Skapad av: {selectedResource.createdBy.givenName} {selectedResource.createdBy.lastName}
                </p>
            )}

            <div className="flex gap-2 justify-end items-center">
                {selectedResourceId && (
                    <button
                        type="button"
                        className="text-red-600 text-sm mr-auto hover:underline"
                        onClick={deleteResource}
                    >
                        Ta bort resurs
                    </button>
                )}
                <Button label="Spara" onClick={saveResource} />
            </div>

            <ErrorMessage error={error} />
        </div>
    );
}
