import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext.ts";
import { useCurrentUser } from "../context/currentUser/currentUserContext.ts";
import { useCurrentCourse } from "../context/course/CourseContext.ts";
import {authApiCall} from "../functions/authApiCall.ts";

export default function Settings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [deleteError, setDeleteError] = useState("");

    const { accessToken, setAccessToken } = useAuth();
    const { setUser } = useCurrentUser();
    const { setCourse } = useCurrentCourse();
    const navigate = useNavigate();

    async function handleChangePassword() {
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("De nya lösenorden matchar inte.");
            return;
        }

        try {
            await authApiCall(
                "/auth/change-password",
                accessToken,
                setAccessToken,
                {
                    method: "POST",
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                    }),
                }
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPasswordSuccess("Lösenordet har ändrats.");
        } catch (error) {
            setPasswordError(
                error instanceof Error
                    ? error.message
                    : "Kunde inte ändra lösenordet."
            );
        }
    }

    async function handleDeleteAccount() {
        if (deleteConfirmation !== "RADERA") {
            return;
        }

        setDeleteError("");

        try {
            await authApiCall(
                "/auth/deregister",
                accessToken,
                setAccessToken,
                {
                    method: "DELETE",
                }
            );

            setAccessToken(null);
            setUser(null);
            setCourse(null);

            navigate("/");
        } catch (error) {
            setDeleteError(
                error instanceof Error
                    ? error.message
                    : "Kunde inte radera kontot."
            );
        }
    }

    const inputClass =
        "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm transition-colors focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

    return (
        <div className="p-6 flex flex-1 justify-center">
            <div className="w-full max-w-md flex flex-col gap-6 self-start">

                {/* Change password */}
                <form
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleChangePassword();
                    }}
                >
                    <h2 className="text-xl font-bold text-slate-800">
                        Ändra lösenord
                    </h2>

                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="currentPassword"
                                className="text-xs font-semibold text-slate-600"
                            >
                                Nuvarande lösenord
                            </label>
                            <input
                                id="currentPassword"
                                className={inputClass}
                                type="password"
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="newPassword"
                                className="text-xs font-semibold text-slate-600"
                            >
                                Nytt lösenord
                            </label>
                            <input
                                id="newPassword"
                                className={inputClass}
                                type="password"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="confirmPassword"
                                className="text-xs font-semibold text-slate-600"
                            >
                                Bekräfta nytt lösenord
                            </label>
                            <input
                                id="confirmPassword"
                                className={inputClass}
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        {passwordError && (
                            <p className="text-xs font-medium text-red-600">
                                {passwordError}
                            </p>
                        )}

                        {passwordSuccess && (
                            <p className="text-xs font-medium text-green-600">
                                {passwordSuccess}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full mt-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl shadow-sm"
                        >
                            Ändra lösenord
                        </button>
                    </div>
                </form>

                {/* Delete account */}
                <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8">
                    <h2 className="text-xl font-bold text-red-700">
                        Radera konto
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                        Detta går inte att ångra. Skriv{" "}
                        <span className="font-semibold">RADERA</span> för att
                        bekräfta.
                    </p>

                    <div className="mt-4 flex flex-col gap-4">
                        <input
                            className={inputClass}
                            type="text"
                            value={deleteConfirmation}
                            onChange={(e) =>
                                setDeleteConfirmation(e.target.value)
                            }
                        />

                        {deleteError && (
                            <p className="text-xs font-medium text-red-600">
                                {deleteError}
                            </p>
                        )}

                        <button
                            type="button"
                            disabled={deleteConfirmation !== "RADERA"}
                            onClick={handleDeleteAccount}
                            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-sm"
                        >
                            Radera mitt konto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
