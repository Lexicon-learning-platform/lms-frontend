import type { ReactNode } from "react";

type UserMenuProps = {
    children: ReactNode;
};

export default function UserMenu({ children }: UserMenuProps) {
    return (
        <div>
            <button>
                {children} ▼
            </button>
        </div>
    );
}
