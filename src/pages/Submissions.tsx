import type { Submissions } from "../models/submissions.ts";
import { useEffect, useState } from "react";
import { authApiCall } from "../functions/authApiCall.ts";
import { useAuth } from "../context/auth/AuthContext.ts";
import ErrorMessage from "../components/Error.tsx";
import type { ActivitySimple } from "../models/ctivitySimple.ts";
import type { TurnIn } from "../models/turnIn.ts";
import Card from "../components/Card.tsx";

export default function Submissions() {
    const [assignments, setAssignments] = useState<ActivitySimple[]>([]);
    const [turnins, setTurnins] = useState<TurnIn[]>([]);
    const [error, setError] = useState<string>("");

    const { accessToken, setAccessToken } = useAuth();

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const data = await authApiCall<Submissions>(
                    "/courses/myassignments",
                    accessToken,
                    setAccessToken,
                    {
                        method: "GET",
                    }
                );

                if (data) {
                    setAssignments(data.assignments);
                    setTurnins(data.turnins);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(
                        "Ett okänt fel uppstod vid hämtning av inlämningar."
                    );
                }
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Inlämningar
            </h1>

            <p className="text-slate-600 mb-6">
                Dina aktuella inlämningsuppgifter
            </p>

            <div className="flex flex-col gap-4">
                {assignments.map((assignment) => {
                    const turnin = turnins.find(
                        (turnin) => turnin.activityId === assignment.id
                    );

                    return (
                        <Card key={assignment.id}>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">
                                        {assignment.name}
                                    </h2>

                                    {turnin && (
                                        <>
                                            <p className="mt-2 text-sm font-medium text-slate-700">
                                                {turnin.name}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                {turnin.description}
                                            </p>
                                        </>
                                    )}
                                </div>

                                {turnin ? (
                                    <span className="shrink-0 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                        Inlämnad
                                    </span>
                                ) : (
                                    <span className="shrink-0 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                                        Ej inlämnad
                                    </span>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            <ErrorMessage error={error} />
        </>
    );
}