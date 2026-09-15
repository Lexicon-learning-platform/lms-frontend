import Button from "./Button"
import {useState} from 'react'
import {authApiCall} from '../functions/authApiCall.ts'
import { useAuth } from "../context/auth/AuthContext.ts";
import ErrorMessage from "./Error";

interface Props {
    moduleId: string,
    activityId: string
}


const AddTurnin = ({moduleId, activityId}: Props) => {

const { accessToken, setAccessToken } = useAuth();
const [hidden, toggleHidden] = useState(true)
const [label, setLabel] = useState("Inlämning")
const [error, setError] = useState<string>('');

const [mytxt, setMytxt] = useState("");
const [assignmentName, setAssignmentName] = useState("");
const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setMytxt(e.target.value);
  }

const toggle = () => {
toggleHidden(hidden => !hidden)    
if(hidden==true) {
    setLabel("Dölj")
    }
else {
    setLabel("Inlämning")
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

<div className="flex flex-col gap-4">
    <Button label={label} onClick={toggle} />
    
    {hidden ? (<></>) : 
        (<>
    

        <input className="border rounded" type="text" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} placeholder={"Namn"}/>
        <input className="border rounded" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={"Beskrivning"}/>

        <textarea
        className="border rounded" 
          value={mytxt}
          onChange={handleChange}
          placeholder="Skriv in text här..."
          cols={30}
          rows={5}
        />


    
    <Button label="Ladda upp inlämning" onClick={upload} />
    
    <ErrorMessage error={error} />


        </>) }
</div>
    </>)
}

export default AddTurnin