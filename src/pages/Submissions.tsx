
import type { Submissions } from '../models/submissions.ts';
import { useEffect, useState } from 'react';
import { authApiCall } from '../functions/authApiCall.ts';
import { useAuth } from "../context/auth/AuthContext.ts";
import ErrorMessage from "../components/Error.tsx";
import type { ActivitySimple } from '../models/activitySimple.ts';
import type { TurnIn } from '../models/turnIn.ts';
import Card from '../components/Card.tsx';



export default function Submissions() {

const [assignments, setAssignments] = useState<ActivitySimple[]>([])
const [turnins, setTurnins] = useState<TurnIn[]>([])

    const [error, setError] = useState<string>('');
    const { accessToken, setAccessToken } = useAuth();

useEffect(() => {
    let isMounted = true; 
    const fetchSubmissions = async () => {
    try {
        const data = await authApiCall<Submissions>(`/courses/myassignments`,
            accessToken,
            setAccessToken,
         { method: 'GET' });
        if (isMounted && data) {
          setAssignments(data.assignments);
          setTurnins(data.turnins);
        }
    }catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Ett okänt fel uppstod vid hämtning av användare.');
          }
        }
    } finally {
      isMounted = false;
    }
    }
fetchSubmissions()
}, []);



    return (
        <>
            <h1>Inlämningar</h1>
            <h2>Dina aktuella inlämningsuppgifter</h2>
            {assignments.map(assignment =>{
                (<>

                    {turnins.map(turnin => {
                        if(turnin.activityId === assignment.id) {
                            <Card>
                                <h2>{turnin.name}</h2>
                                <h2>{assignment.name}</h2>
                                <h3>{turnin.description}</h3>
                            </Card>
                        }
                    })}

                </>)
            })}
            <ErrorMessage error={error} />
        </>
    );
}
