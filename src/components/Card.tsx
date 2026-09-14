interface Props {
    children: React.ReactNode;
}

export default function Card({ children }: Props) {
    return (
        <>
            <div className="w-fit bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-2 my-4">
                {children}
            </div>
        </>
    );
}
