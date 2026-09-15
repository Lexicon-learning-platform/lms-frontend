import Card from "../components/Card";
import Classmates from "../components/classmates";

export default function Home() {
    return (
        <>
            <h1 className="text-xl font-bold">
                Webbutveckling
            </h1>

            <section className="col-span-12 space-y-6">
                <Card>
                    <h3 className="font-semibold text-slate-800 text-sm">⚠️ Ej inlämnad uppgift</h3>
                    <p className="text-xs text-slate-500">Du har inte lämnat in uppgiften "React Components".</p>
                </Card>
            </section>

            <section className="col-span-12 space-y-6">
                <h2 className="mb-2 text-lg font-semibold">
                    Pågående modul
                </h2>

                <div>
                    <h3 className="font-semibold">
                        React
                    </h3>

                    <p>24 aug – 18 sep</p>
                </div>
            </section>

            <section className="col-span-12 space-y-6">
                <h2 className="mb-2 text-lg font-semibold">
                    Nästa aktivitet
                </h2>

                <div>
                    <h3 className="font-semibold">
                        Föreläsning: React Router
                    </h3>

                    <p>Idag 10:00</p>
                </div>
            </section>

           <section className="col-span-12 space-y-6">
            <div className="w-1/4">
            <Classmates  />
            </div>
           </section>

        </>
    );
}
