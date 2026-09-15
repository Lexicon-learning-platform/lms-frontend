import Card from "../components/Card";
import Classmates from "../components/classmates";
import { useCurrentCourse } from "../context/course/CourseContext.ts";

export default function Home() {
    const { course } = useCurrentCourse();

    if (!course) {
        return <p>Ingen kurs hittades.</p>;
    }

    return (
        <>
            <section className="col-span-12 space-y-2">
                <h1 className="text-xl font-bold text-slate-800">
                    {course.name}
                </h1>

                <p className="text-sm text-slate-600">
                    {course.description}
                </p>
            </section>

            <section className="col-span-12">
                <Card>
                    <div className="flex gap-8">
                        <div>
                            <p className="text-xs text-slate-500">
                                Startdatum
                            </p>
                            <p className="font-semibold text-slate-800">
                                {course.startDate}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500">
                                Kurslängd
                            </p>
                            <p className="font-semibold text-slate-800">
                                {course.duration} veckor
                            </p>
                        </div>
                    </div>
                </Card>
            </section>


            <section className="col-span-12 space-y-6">
                <div className="w-1/4">
                    <Classmates courseId={course.id} />
                </div>
            </section>
        </>
    );
}
