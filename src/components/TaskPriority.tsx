import {Medium} from "../assets/icons/Medium.tsx";
import {High} from "../assets/icons/High.tsx";
import {Low} from "../assets/icons/Low.tsx";

const priorityTypes = {
    medium: {
        mainDivClassName: 'border-[#FFBE0B] rounded-sm',
        icon: <Medium/>,
        priority: 'საშუალო',
        priorityClassname: 'text-[#FFBE0B]'
    },
    high: {
        mainDivClassName: 'border-[#FA4D4D] rounded-[5px]',
        icon: <High/>,
        priority: 'მაღალი',
        priorityClassname: 'text-[#FA4D4D]'
    },
    low: {
        mainDivClassName: 'border-[#08A508] rounded-[5px]',
        icon: <Low/>,
        priority: 'დაბალი',
        priorityClassname: 'text-[#08A508]'
    }
}

export type priorityType = keyof typeof priorityTypes;


export function TaskPriority({type}: { type: priorityType }) {

    const selectedType = priorityTypes[type];

    return (
        <div className={`${selectedType.mainDivClassName} w-[86px] h-[26px] border-[0.5px] p-1 flex gap-1`}>
            <div>{selectedType.icon}</div>
            <p className={`text-xs leading-[150%] font-medium ${selectedType.priorityClassname}`}>{selectedType.priority}</p>
        </div>
    );
};