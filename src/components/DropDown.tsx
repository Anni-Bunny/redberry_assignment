import React, {ReactElement, useEffect, useRef, useState} from 'react';

interface dropdownProps {
    icon?: ReactElement;
    title?: string;
    children?: React.ReactNode,
    childClassName?: string,
    mainDivClassName?: string
    titleClassName?: string
}

export function Dropdown({
                             icon,
                             title,
                             children,
                             childClassName,
                             mainDivClassName,
                             titleClassName
                         }: dropdownProps) {
    const [isVisible, setIsVisible] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsVisible((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsVisible(false); 
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <span className={`flex relative w-full items-center justify-center ${mainDivClassName}`} ref={dropdownRef}>
            <button className={`relative cursor-pointer flex gap-2 ${titleClassName}`} onClick={toggleDropdown}>{title} {icon}</button>
            <div
                className={`w-[688px] rounded-[10px] bottom-[-21px] absolute translate-y-full z-10 ${isVisible ? '' : 'hidden'} bg-white border-[0.5px] border-[#8338EC] transition duration-400 pt-10 pb-5 px-[30px] flex flex-col gap-[25px] ${childClassName}`}>
                {children}
            </div>
        </span>
    );
}
