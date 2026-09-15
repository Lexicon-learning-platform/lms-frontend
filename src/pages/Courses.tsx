import { useState } from "react";
import CourseControl from "../components/CourseControl.tsx";
import ModuleControl from "../components/ModuleControl.tsx";

export default function Courses() {
    const [moduleVersion, setModuleVersion] = useState(0);

    return (
        <main className="w-full flex-1 flex">
            <section className="w-full flex flex-col gap-12">
                <div className="mx-auto px-4 md:px-12 py-12 w-full">
                    <div className="max-w-3xl mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Kurser
                        </h1>
                        <p className="text-slate-600">
                            Skapa och redigera kurser.
                        </p>
                    </div>

                    <CourseControl moduleRefreshSignal={moduleVersion} />
                </div>

                <div className="mx-auto px-4 md:px-12 pb-12 w-full">
                    <div className="max-w-3xl mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Moduler
                        </h2>
                        <p className="text-slate-600">
                            Skapa och redigera moduler. Lägg till en modul i en kurs ovan.
                        </p>
                    </div>

                    <ModuleControl onSaved={() => setModuleVersion(v => v + 1)} />
                </div>
            </section>
        </main>
    );
}
