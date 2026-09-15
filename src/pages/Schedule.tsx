



import scheduleImage from "../assets/schedule.png";

export default function Schedule() {
    return (
        <div>
            <h1 className="mb-4 text-center text-2xl font-bold py-5">
                Schema
            </h1>

            <img
                src={scheduleImage}
                alt="Schema för utbildningen"
                className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white"
            />
        </div>
    );
}
