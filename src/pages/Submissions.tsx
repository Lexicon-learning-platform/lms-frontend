import {useState, useEffect} from 'react'
import {authApiCall} from '../functions/authApiCall.ts'
import { useAuth } from "../context/auth/AuthContext.ts";
import ErrorMessage from "../components/Error.tsx";
import type { Submissions } from '../models/submissions.ts';
import {useCurrentUser} from "../context/currentUser/currentUserContext.ts";
import {useCurrentCourse} from "../context/course/CourseContext.ts";

export default function Submissions() {

    const [subs, setSubs] = useState<Submissions>()
    const [error, setError] = useState<string>('');
    const { accessToken, setAccessToken } = useAuth();
    const { user } = useCurrentUser();
    const { course } = useCurrentCourse();


useEffect(() => {
    let isMounted = true; 
    const fetchSubmissions = async () => {
    try {
        const data = await authApiCall<Submissions>(`/modules/${moduleId}/activities/${activityId}/completion/${user?.courseId}`,
            accessToken,
            setAccessToken,
         { method: 'GET' });
        if (isMounted && data) {
          setSubs(data);
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

<div>
         <h2>Kompletterade inlämningsuppgifter</h2>

                {subs?.completedSubs?.map(comp => (
                    <h3>{comp}</h3>                
                ))}
</div>

<div>
         <h2>Försenade inlämningsuppgifter</h2>

                {subs?.unCompletedSubs?.map(comp => (
                    <h3>{comp}</h3>                
                ))}
</div>

               <ErrorMessage error={error} />
 

        </>
    );
}
