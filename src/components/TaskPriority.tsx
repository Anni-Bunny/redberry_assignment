import {Medium} from "../assets/icons/Medium.tsx";
import {High} from "../assets/icons/High.tsx";
import {Low} from "../assets/icons/Low.tsx";

export const priorityTypes = [
    {
        mainDivClassName: 'border-[#08A508] rounded-[5px]',
        icon: <Low/>,
        priority: 'დაბალი',
        priorityClassname: 'text-[#08A508]'
    },
    {
        mainDivClassName: 'border-[#FFBE0B] rounded-sm',
        icon: <Medium/>,
        priority: 'საშუალო',
        priorityClassname: 'text-[#FFBE0B]'
    },
    {
        mainDivClassName: 'border-[#FA4D4D] rounded-[5px]',
        icon: <High/>,
        priority: 'მაღალი',
        priorityClassname: 'text-[#FA4D4D]'
    }
]

export function TaskPriority({type = 2, classname, label}: { type: number, classname?: string, label?: string }) {

    const selected = priorityTypes[(type - 1) % priorityTypes.length]
    const showIcon = !!selected.icon

    return (
        <div className={`${selected.mainDivClassName} ${classname} w-[86px] h-[26px] border-[0.5px] p-1 flex gap-1 items-center justify-center`}>
            {showIcon && <div>{selected.icon}</div>}
            <p className={`text-xs leading-[150%] font-medium ${selected.priorityClassname}`}>
                {label ?? selected.priority}
            </p>
        </div>
    )
}