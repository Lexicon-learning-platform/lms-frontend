import UserList from "../components/UserControl";


export default function Admin() {



    return (
        <main className="w-full flex-1 flex">
            <section className="w-full">
                <div className="mx-auto px-12 py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold text-slate-900 mb-6">
                            Administrativ Dashboard
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Gör administrativa ändringar här.
                        </p>
                    </div>

                <UserList />

                </div>
            </section>
        </main>
    );
}
