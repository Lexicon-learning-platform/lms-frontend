import type { Submissions } from '../models/submissions.ts';
import {useCurrentUser} from "../context/currentUser/currentUserContext.ts";
import {useCurrentCourse} from "../context/course/CourseContext.ts";
import GetSubs from '../components/GetSubs.tsx';

export default function Submissions() {

    const { user } = useCurrentUser();
    const { course } = useCurrentCourse();


    return (
        <>

{course?.modules.forEach(module => {
    <p>{module.name}</p>
    module.activities.forEach(activity => {
        <>
        <p>{activity.name}</p>
        <GetSubs moduleId={module.id} activityId={activity.id} userId={user?.id} />
        </>
    })
})
}


        </>
    );
}
