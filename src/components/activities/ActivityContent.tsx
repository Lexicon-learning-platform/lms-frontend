
import type { Activity } from "../../models/activity";
import LectureView from "./LectureView";
import ExerciseView from "./ExerciseView.tsx";
import AssignmentView from "./AssignmentView";
import ElearnView from "./ElearnView";

interface ActivityContentProps {
    activity: Activity;
}

export default function ActivityContent({
                                            activity
                                        }: ActivityContentProps) {
    switch (activity.activityType) {
        case "Lecture":
            return <LectureView activity={activity} />;

        case "Exercise":
            return <ExerciseView activity={activity} />;

        case "Assignment":
            return <AssignmentView activity={activity} />;

        case "Elearn":
            return <ElearnView activity={activity} />;

        default:
            return <div>No content</div>
    }
}
