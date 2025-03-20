import React from "react";
import {Check} from "../assets/icons/Check.tsx";

interface checkboxProps {
    label?: string,
    name?: string,
    image?: string,
    value?: string | number,
    checked?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function CheckBox({label, name, image, value, checked = false, onChange}: checkboxProps) {

    return (
        <label className="flex items-center gap-[15px]">
            <input type="checkbox" value={value} checked={checked} name={name} onChange={onChange}
                   className="hidden peer"/>
            <span className="w-[22px] h-[22px] border-[1.5px] rounded-[6px] border-[#8338EC] flex items-center justify-center relative">
                <span className={`${ !checked ? 'hidden' : ''}`}>
                    <Check color="#8338EC"/>
                </span>
            </span>
            <span className=" flex gap-2.5 items-center text-[#474B57]">
                {image && <img src={image} alt="img" className='w-[28px] h-[28px] rounded-full'/>}

                {label}
            </span>
        </label>
    );
}
