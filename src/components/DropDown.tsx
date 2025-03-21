import React, {ReactElement, useEffect, useRef, useState} from 'react';

interface dropdownProps {
    icon?: ReactElement;
    title?: string;
    children?: React.ReactNode,
    childClassName?: string,
    mainDivClassName?: string
    titleClassName?: string,
    outsideClickCallback?: () => void
    chooseCallback?: () => void
}

export function Dropdown({
                             icon,
                             title,
                             children,
                             childClassName,
                             mainDivClassName,
                             titleClassName,
                             outsideClickCallback,
                             chooseCallback
                         }: dropdownProps) {
    const [isVisible, setIsVisible] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsVisible((prev) => !prev);
    };


    const isVisibleRef = useRef(isVisible);

    useEffect(() => {
        isVisibleRef.current = isVisible;
    }, [isVisible]);


    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            if (outsideClickCallback && isVisibleRef.current)
                outsideClickCallback()
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleChoose() {
        setIsVisible(false);
        if(chooseCallback) {
            chooseCallback()
        }
    }

    return (
        <span className={`flex relative items-center justify-center ${mainDivClassName}`} ref={dropdownRef}>
            <button className={`relative cursor-pointer flex gap-2 ${titleClassName}`} onClick={toggleDropdown}>{title} {icon}</button>
            <div
                className={`bottom-[-21px] absolute translate-y-full z-10 ${isVisible ? '' : 'hidden'} bg-white border-[0.5px] transition duration-400 flex flex-col ${childClassName}`}>
                {children}

                <div className='flex justify-end'>
                <button onClick={() => handleChoose()}
                        className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>არჩევა
                </button>
            </div>
            </div>

        </span>
    );
}
