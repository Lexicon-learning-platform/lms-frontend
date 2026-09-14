export interface ApplicationUser {
    id: string;
    userName: string;
    givenName: string | null;
    lastName: string | null;
    courseId: string | null;
    role: string;
}
