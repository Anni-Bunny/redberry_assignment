import {Department} from "../interfaces/department.ts";

const depColors = [
    'bg-fuchsia-400',
    'bg-green-400',
    'bg-[#FF66A8]',
    'bg-emerald-400',
    'bg-[#FD9A6A]',
    'bg-[#89B6FF]',
    'bg-[#FFD86D]'
]

export function Departments({department, classname}: { department: Department, classname?: string}) {

    const selectedColor = depColors[department.id % depColors.length]

    return (
        <div className={`${classname} flex justify-start w-[88px] h-6 rounded-[15px] py-[5px] px-[9px] text-white font-normal text-xs items-center ${selectedColor}`}>
            <span className={"text-nowrap overflow-hidden text-ellipsis"}>
                {department.name}
            </span>
        </div>
    );
};
