export default function Home() {
    return (
        <main className="p-6">
            <h1 className="text-xl font-bold">
                Webbutveckling
            </h1>

            <section className="mt-6">
                <div className="border p-4">
                    <p className="font-semibold">
                        ⚠️ Ej inlämnad uppgift
                    </p>

                    <p>
                        Du har inte lämnat in uppgiften "React Components".
                    </p>
                </div>
            </section>

            <section className="mt-8">
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

            <section className="mt-8">
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
        </main>
    );
}
