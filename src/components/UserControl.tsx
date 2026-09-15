import {useState, useEffect} from 'react'
import type {ApplicationUser} from '../models/applicationUser.ts'
import Button from './Button.tsx'
import ErrorMessage from './Error.tsx'
import {authApiCall} from '../functions/authApiCall.ts'
import { useAuth } from "../context/auth/AuthContext.ts";
import type { UserStats } from '../models/userStats.ts'
import AdjustUserCourse from './AdjustUserCourse.tsx'




const UserList = () => {

    const [updateTrigger, setUpdateTrigger] = useState(0)

    const [users, setUsers] = useState<ApplicationUser[]>([])
    const [selectedUser, setSelectedUser] = useState("")    //The Id of the selected user
    const [activeUserStats, setActiveUserStats] = useState<UserStats>()
    const [error, setError] = useState<string>('');
        const { accessToken, setAccessToken } = useAuth();


    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRole, setNewUserRole] = useState("");

useEffect(() => {
  if(selectedUser!='') {
    let isMounted = true; 
    const getUserStats = async () => {
    try {
        const data = await authApiCall<UserStats>(`/admin/getuserstats/${selectedUser}`,
            accessToken,
            setAccessToken,
         { method: 'GET' });
        if (isMounted && data) {
          setActiveUserStats(data);
        }
    }catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Ett okänt fel uppstod vid hämtning av uppgifter.');
          }
        }
    } finally {
      isMounted = false;
    }
    }

getUserStats()}
}, [selectedUser]);



useEffect(() => {
    let isMounted = true; 
    const fetchAllUsers = async () => {
    try {
        const data = await authApiCall<ApplicationUser[]>(`/admin/getusers`,
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

fetchAllUsers()
}, [updateTrigger]);


const deleteUser = async () => {
    if(selectedUser != "") {
      try {
        await authApiCall(`/admin/deleteuser/${selectedUser}`, accessToken, setAccessToken,
         { method: 'DELETE' });
      setUpdateTrigger(Date.now());
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }}
  };

  const disableUser = async () => {
    if(selectedUser != "") {
      try {
        await authApiCall(`/admin/disableuser/${selectedUser}`, accessToken, setAccessToken,
         { method: 'PUT' });
      setUpdateTrigger(Date.now());
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }}
  };

  const enableUser = async () => {
    if(selectedUser != "") {
      try {
        await authApiCall(`/admin/enableuser/${selectedUser}`, accessToken, setAccessToken,
         { method: 'PUT' });
      setUpdateTrigger(Date.now());
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }}
  };

  const register = async () => {

      try {
        await authApiCall(`/admin/register/?role=${newUserRole}`, accessToken, setAccessToken,
         { method: 'POST',
          body: JSON.stringify({
            username: newUserName,
            password: newUserPassword
          })
          });
      setUpdateTrigger(Date.now());
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }
  };


return (<>

<div className='flex flex-row'>

<aside className='flex flex-col w-1/4'>
    <div id="alterUser" className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-6 p-6 m-6 h-auto">
    <select name="UserList" onChange={(e) => setSelectedUser(e.target.value)}>
        <option key="..." value="">...</option>
        {users.map(user => (

        <option key={user.id} value={user.id}>{user.userName}</option>

        ))}

    </select>
<div className="flex gap-2 justify-between">
    <Button label="Radera" onClick={deleteUser} />
    <Button label="Deaktivera" onClick={disableUser} />
    <Button label="Reaktivera" onClick={enableUser} />
</div>
    <ErrorMessage error={error} />

    </div>

    <div id="registering" className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-6 p-6 m-6">
    
        <input className="w-auto bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500 m-1" type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder={"Namn"} />
        <input className="w-auto bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500 m-1" type="text" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} placeholder={"Lösenord"} />
    
    <select className="w-auto bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500 m-1"
     onChange={(e) => setNewUserRole(e.target.value)}>
  <option value="Student">Student</option>
  <option value="Teacher">Teacher</option>
  <option value="Admin">Admin</option>

</select>

    <div className="flex gap-2 justify-between">
      <Button label="Registrera" onClick={register} />
    </div>
    
    <ErrorMessage error={error} />
    </div>
    
    </aside>


<main className='flex flex-col w-2/4 text-center'>
        <div id="userdata" className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col gap-6 p-6 m-6">
            <h1>{activeUserStats?.userName || "Användarnamn"}</h1>
            <h2>{activeUserStats?.givenName || "Förnamn"} {activeUserStats?.lastName || "Efternamn"}</h2>
            <h2>{activeUserStats?.id || "Id"}</h2>

            <div className="flex w-1/2">
            <AdjustUserCourse userId={activeUserStats?.id || null} />
            </div>

<hr></hr>
          <span>Kurser</span>
          <table className="mx-auto table table-fixed table-hover">
            <thead>
                <tr>
                    <th className='w-1/4'>Namn</th>
                    <th className='w-1/4'>Startdatum</th>
                    <th className='w-1/8'>Längd</th>

                </tr>
            </thead>

            <tbody>
                {activeUserStats?.courses?.map(course => (
                
               
                <tr className="hover:bg-slate-200" key={course.id}>
                    <td className='w-1/4'>{course.name}</td>
                    <td className='w-1/4'>{course.startDate}</td>
                    <td className='w-1/8'>{course.duration}</td>

                </tr>
                
                ))}
            </tbody>
        </table>



        </div>



</main>
</div>
</>)

}

export default UserList