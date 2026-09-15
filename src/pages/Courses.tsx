import CourseControl from "../components/CourseControl.tsx";

export default function Courses() {
    return (
        <main className="w-full flex-1 flex">
            <section className="w-full">
                <div className="mx-auto px-4 md:px-12 py-12 w-full">
                    <div className="max-w-3xl mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Kurser
                        </h1>
                        <p className="text-slate-600">
                            Skapa och redigera kurser.
                        </p>
                    </div>

                    <CourseControl />
                </div>
            </section>
        </main>
    );
}
