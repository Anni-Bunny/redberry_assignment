import { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={`w-[1680px] flex mx-auto items-center ${className}`}>
            {children}
        </div>
    );
}
