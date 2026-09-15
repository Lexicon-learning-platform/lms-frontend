import {useState, useEffect} from 'react'
import type {ApplicationUser} from '../models/applicationUser.ts'

import {authApiCall} from '../functions/authApiCall.ts'
import { useAuth } from "../context/auth/AuthContext.ts";
import ErrorMessage from './Error.tsx';

const Classmates = () => {

const { accessToken, setAccessToken } = useAuth();
   const [users, setUsers] = useState<ApplicationUser[]>([])
    const [error, setError] = useState<string>('');


useEffect(() => {
    let isMounted = true; 
    const fetchAllClassmates = async () => {
    try {
        const data = await authApiCall<ApplicationUser[]>(`/courses/getclassmates`,
            accessToken,
            setAccessToken,
         { method: 'GET' });
        if (isMounted && data) {
          setUsers(data);
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

fetchAllClassmates()
}, []);


    return (<>

            <span>Kursdeltagare:</span>
            
              <table className="mx-auto table table-fixed table-hover">
            <thead className='text-left'>
                <tr>
                    <th className='w-1/4'>Namn</th>
                    <th className='w-1/4'>Användarnamn</th>
                    <th className='w-1/4'>Roll</th>

                </tr>
            </thead>

            <tbody>
                {users?.map(user => (
                
               
                <tr className="hover:bg-slate-200" key={user.id}>
                    <td className='w-1/4'>{user.givenName} {user.lastName}</td>
                    <td className='w-1/4'>{user.userName}</td>
                    <td className='w-1/4'>{user.role}</td>
                </tr>
                
                ))}
            </tbody>
        </table>

    <ErrorMessage error={error} />

    
    </>)
}

export default Classmates