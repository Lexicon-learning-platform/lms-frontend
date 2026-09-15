import Button from "./Button"
import {useState} from 'react'
import {authApiCall} from '../functions/authApiCall.ts'
import { useAuth } from "../context/auth/AuthContext.ts";
import ErrorMessage from "./Error";

const AddTurnin = (moduleId, activityId) => {

const { accessToken, setAccessToken } = useAuth();
const [hidden, toggleHidden] = useState(true)
const [label, setLabel] = useState("Visa")
const [error, setError] = useState<string>('');

const [mytxt, setMytxt] = useState("");
const [assignmentName, setAssignmentName] = useState("");
const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setMytxt(e.target.value);
  }

const toggle = () => {
    if(hidden==true) {
toggleHidden(false)
setLabel("Dölj")
}
else {
    toggleHidden(true)
    setLabel("Visa")
    }
}

  const upload = async () => {

      try {
        await authApiCall(`/modules/${moduleId}/activities/${activityId}/resources`, accessToken, setAccessToken,
         { method: 'POST',
          body: JSON.stringify({
            Name: assignmentName,
            Description: description,
            Type: "AssignmentTurnin",
            Data: mytxt
          })
          });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      }
    }
  };

    return (<>
    
    <Button label={label} onClick={toggle} />
    
    {hidden ? (<></>) : 
        (<>
    
<form>
      <label>Write here:
                <input type="text" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} placeholder={"Namn"}/>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={"Beskrivning"}/>

        <textarea
          value={mytxt}
          onChange={handleChange}
          placeholder="Skriv in text här..."
          cols={30}
          rows={5}
        />
      </label>
      <p>Current value: {mytxt}</p>
    </form>
    
    <Button label="Ladda upp" onClick={upload} />
    
    <ErrorMessage error={error} />


        </>) }
    
    </>)
}

export default AddTurnin