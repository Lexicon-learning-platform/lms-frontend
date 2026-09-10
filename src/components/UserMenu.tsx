import { useState } from 'react';

type UserMenuProps = {
    userName: string;
};

export default function UserMenu({ userName }: UserMenuProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 text-sm font-medium text-slate-700"
            >
                <span>{userName}</span>
                <span className="text-xs text-slate-400">
                    {isExpanded ? '▲' : '▼'}
                </span>
            </button>

            {isExpanded && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-sm">
                    <a href="#" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">
                        Profil
                    </a>
                    <a href="#" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">
                        Inställningar
                    </a>
                    <hr className="my-1 border-slate-100" />
                    <a href="#" className="block px-4 py-2 text-red-600 hover:bg-red-50">
                        Logga ut
                    </a>
                </div>
            )}
            </div>
    );
}
