import {ReactNode} from "react";

export function Card({ children, className }: { children?: ReactNode; className?: string }) {
    return (
        <div className={`w-[381px] h-[250px] rounded-[15px] border p-5 flex flex-col gap-7 items-center justify-between ${className}`}>
            {children}
        </div>
    );
}