import {useState, useEffect} from 'react'
import type {ApplicationUser} from '../models/applicationUser.ts'
import Button from './Button.tsx'
import ErrorMessage from './Error.tsx'
import {authApiCall} from '../functions/authApiCall'
import { useAuth } from "../context/auth/AuthContext.ts";




const UserList = () => {

    const [updateTrigger, setUpdateTrigger] = useState(0)

    const [users, setUsers] = useState<ApplicationUser[]>([])
    const [selectedUser, setSelectedUser] = useState("")
    const [error, setError] = useState<string>('');
        const { accessToken, setAccessToken } = useAuth();


    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRole, setNewUserRole] = useState("");

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
            setError('Ett okänt fel uppstod vid hämtning av recensioner.');
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
        await authApiCall(`/deleteuser/${selectedUser}`, accessToken, setAccessToken,
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
        await authApiCall(`/disableuser/${selectedUser}`, accessToken, setAccessToken,
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
        await authApiCall(`/enableuser/${selectedUser}`, accessToken, setAccessToken,
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
        await authApiCall(`/register/?role=${newUserRole}`, accessToken, setAccessToken,
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

    <div id="alterUser" className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col w-3/4 gap-6 p-6 m-6">
    <select name="ApplicationUser" id="ApplicationUser" onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">...</option>
        {users.map(user => (

        <option key={user.id} value={user.id}>{user.userName}</option>

        ))}

    </select>

    <Button label="Radera" onClick={deleteUser} />
    <Button label="Deaktivera" onClick={disableUser} />
    <Button label="Reaktivera" onClick={enableUser} />

    <ErrorMessage error={error} />

    </div>

    <div id="registering" className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col w-3/4 gap-6 p-6 m-6">
    
        <div className="mx-auto flex flex-col w-full bg-gray rounded-xl border border-slate-400 shadow-sm h-auto p-6 m-6">
        <input className="w-auto bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500 m-1" type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder={"Title"} />
        <input className="w-auto bg-slate-100 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-emerald-500 m-1" type="text" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} placeholder={"Genre"} />
    
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
    
    </div>


</>)

}

export default UserList