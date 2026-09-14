import type { Dispatch, SetStateAction } from "react";
import type { ApplicationUser } from "../models/applicationUser.ts";
import type { Course } from "../models/course.ts";
import { authApiCall } from "./authApiCall.ts";

type SetAccessToken = (token: string | null) => void;
type SetUser = Dispatch<SetStateAction<ApplicationUser | null>>;
type SetCourse = Dispatch<SetStateAction<Course | null>>;

export async function loadSession(
    token: string,
    setAccessToken: SetAccessToken,
    setUser: SetUser,
    setCourse: SetCourse
) {
    setAccessToken(token);

    const [userResponse, courseResponse] = await Promise.all([
        authApiCall<ApplicationUser>(
            "/auth/getuser",
            token,
            setAccessToken
        ),
        authApiCall<Course>(
            "/courses/my-course",
            token,
            setAccessToken
        )
    ]);

    if (!userResponse) {
        throw new Error("Could not get user");
    }

    setUser(userResponse);
    setCourse(courseResponse);
}
