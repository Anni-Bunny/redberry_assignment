import {Card} from "./Card.tsx";
import {TaskPriority} from "./TaskPriority.tsx";
import {Departments} from "./Departments.tsx";
import {Comment} from "../assets/icons/Comment.tsx";
import {Task} from "../interfaces/Task.ts";

const borderColors = ['border-[#3A86FF]', 'border-[#F7BC30]', 'border-[#FB5607]', 'border-[#FF006E]']


export function TaskCard({task}: {task: Task }) {
    return (
        <Card className={`${borderColors[(task.status.id % borderColors.length)]}`}>
            <div className='h-[26px] w-[341px] flex justify-between'>
                <div className='flex gap-2.5 items-center justify-center'>
                    <TaskPriority type={task.priority.id}/>
                    <Departments department={task.department}/>
                </div>

                <span
                    className='font-normal text-xs w-[76px] h-[]14px flex items-center justify-end text-[#212529]'>{task.due_date}</span>
            </div>

            <div className='w-80 h-16 flex flex-col gap-3'>
                <h3 className='text-[#212529] font-medium text-[15px]'>{task.name}</h3>
                <p className='text-[#343A40] font-normal text-sm'>{task.description}</p>
            </div>

            <div className='h-[31px] flex justify-between w-full items-center'>
                <img src={task.employee.avatar} alt="img" className='w-[31px]'/>
                <div className='flex gap-[2.5px]'>
                    <Comment/>
                    <p>{task.total_comments}</p>
                </div>
            </div>
        </Card>
    );
};