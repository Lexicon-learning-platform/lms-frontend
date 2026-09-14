import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClose: () => void;
}

export default function DialogBase({ children, onClose }: Props) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="realtive w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border  rounded-2xl shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="close"
                    className="absolute top-4 right-4 text-black/60 hover:text-black"
                >
                    <X className="w-5 h-5" />
                </button>
                {children}
            </div>
        </div>
    );
}
