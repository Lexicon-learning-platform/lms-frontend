import { useState, useEffect } from "react";
import { authApiCall } from "../functions/authApiCall.ts";
import { useAuth } from "../context/auth/AuthContext.ts";
import ErrorMessage from "./Error.tsx";
import type { CourseMember } from "../models/courseMember.ts";

type Props = {
    courseId: string;
};

const Classmates = ({ courseId }: Props) => {

    const { accessToken, setAccessToken } = useAuth();
    const [users, setUsers] = useState<CourseMember[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourseMembers = async () => {
            try {
                setError("");

                const data = await authApiCall<CourseMember[]>(
                    `/courses/${courseId}/members`,
                    accessToken,
                    setAccessToken,
                    { method: "GET" }
                );

                console.log("members for", courseId, data);
                setUsers(data ?? []);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ett okänt fel uppstod vid hämtning av kursdeltagare.");
                }
            }
        };

        fetchCourseMembers();
    }, [courseId]);

    return (
        <>
            <span>Kursdeltagare:</span>

            <table className="mx-auto table table-fixed table-hover">
                <thead className="text-left">
                <tr>
                    <th className="w-1/4">Namn</th>
                    <th className="w-1/4">Användarnamn</th>
                    <th className="w-1/4">Roll</th>
                </tr>
                </thead>

                <tbody>
                {users.map(user => (
                    <tr className="hover:bg-slate-200" key={user.id}>
                        <td className="w-1/4">
                            {user.givenName} {user.lastName}
                        </td>
                        <td className="w-1/4">{user.userName}</td>
                        <td className="w-1/4">{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ErrorMessage error={error} />
        </>
    );
};

export default Classmates;
