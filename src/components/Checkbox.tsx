import React from "react";

interface checkboxProps {
    label?: string,
    name?: string,
    value?: string | number,
    checked?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function CheckBox({label, name, value, checked = false, onChange}: checkboxProps) {

    return (
        <label className="flex gap-[15px]">
            <input type="checkbox" value={value} checked={checked} name={name} onChange={onChange}
                   className="hidden peer"/>
            <span className="w-[22px] h-[22px] border-[1.5px]  rounded-[6px] peer-checked:border-[#8338EC]"></span>
            <span className="text-[#474B57]">{label}</span>
        </label>
    );
}
