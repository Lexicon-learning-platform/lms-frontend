import Button from "./Button"
import {useState, useEffect} from 'react'
import {authApiCall} from '../functions/authApiCall.ts'
import { useAuth } from "../context/auth/AuthContext.ts";
import type { Course } from "../models/course.ts";
import ErrorMessage from "./Error.tsx";


const AdjustUserCourse = ({userId}) => {

    const [courses, setCourses] = useState<Course[]>([])
    const [selectedCourseId, setSelectedCourseId] = useState("")   
    const [error, setError] = useState<string>('');
    const { accessToken, setAccessToken } = useAuth();

useEffect(() => {
    let isMounted = true; 
    const fetchAllCourses = async () => {
    try {
        const data = await authApiCall<Course[]>(`/courses`,
            accessToken,
            setAccessToken,
         { method: 'GET' });
        if (isMounted && data) {
          setCourses(data);
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
fetchAllCourses()
}, []);

  const register = async () => {

      try {
        await authApiCall(`/admin/addcoursetouser/${userId}/${selectedCourseId}`, accessToken, setAccessToken,
         { method: 'PUT'
          });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }
  };


  const unregister = async () => {

      try {
        await authApiCall(`/admin/removecoursefromuser/${userId}`, accessToken, setAccessToken,
         { method: 'PUT'
          });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }
  };

    return (<>
    
    <div className="flex flex-col">
    <select name="Courses" onChange={(e) => setSelectedCourseId(e.target.value)}>
        <option key="..." value="">Kurser</option>
        {courses.map(course => (

        <option key={course.id} value={course.id}>{course.name}</option>

        ))}

    </select>

    <ErrorMessage error={error} />

        <div className="flex flex-row">
            <Button label="Registrera" onClick={register} />
            <Button label="Avregistrera" onClick={unregister} />
        </div>
    </div>
    </>)
} 
export default AdjustUserCourse