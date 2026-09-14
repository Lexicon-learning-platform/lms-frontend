import {useState, useEffect, useContext} from 'react'
import type {ApplicationUser} from '../models/applicationUser.ts'
import Button from './Button.tsx'
import ErrorMessage from './Error.tsx'
import {authApiCall} from '../functions/authApiCall'
import { useAuth } from "../context/auth/AuthContext.ts";

interface Props {
updateList: (timestamp: number) => void

}


const UserList = ({updateList}: Props) => {

    const [users, setUsers] = useState<ApplicationUser[]>([])
    const [selectedUser, setSelectedUser] = useState("")
    const [error, setError] = useState<string>('');
        const { accessToken, setAccessToken } = useAuth();


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
}, [updateList]);



const deleteUser = async () => {
    if(selectedUser != "") {
      try {
        await authApiCall(`/deleteuser/${selectedUser}`, accessToken, setAccessToken,
         { method: 'DELETE' });
      updateList(Date.now());
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
      updateList(Date.now());
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
      updateList(Date.now());
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }}
  };

return (<>

    <div className="bg-slate-200 rounded-xl border border-slate-900 flex flex-col w-3/4 gap-6 p-6 m-6">
    <select name="ApplicationUser" id="ApplicationUser" onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">...</option>
        {users.map(user => (

        <option key={user.userId} value={user.userId}>{user.givenName} {user.lastName}</option>

        ))}

    </select>

    <Button label="Radera" onClick={deleteUser} />
    <Button label="Deaktivera" onClick={disableUser} />
    <Button label="Reaktivera" onClick={enableUser} />

    <ErrorMessage error={error} />

    </div>


</>)

}

export default UserList