import {Card} from "./Card.tsx";
import {TaskPriority} from "./TaskPriority.tsx";
import {Departments} from "./Departments.tsx";
import {Comment} from "../assets/icons/Comment.tsx";
import {Task} from "../interfaces/Task.ts";
import {format} from 'date-fns';

const borderColors = ['border-[#3A86FF]', 'border-[#F7BC30]', 'border-[#FB5607]', 'border-[#FF006E]']


export function TaskCard({task}: { task: Task }) {
    const formattedDate = format(new Date(task.due_date), "dd MMM, yyyy");
    const formattedDescription = task.description.length > 100 ? task.description.slice(0, 100) + '...' : task.description;

    return (
        <Card className={`${borderColors[(task.status.id % borderColors.length)]}`}>
            <div className="flex-col flex gap-[28px]">

                <div className='h-[26px] w-[341px] flex justify-between'>
                    <div className='flex gap-2.5 items-center justify-center'>
                        <TaskPriority type={task.priority.id}/>
                        <Departments department={task.department}/>
                    </div>

                    <span
                        className='font-normal text-xs w-[76px] h-[]14px flex items-center justify-end text-[#212529]'>
                        {formattedDate}
                    </span>
                </div>

                <div className='w-80 flex flex-col gap-3'>
                    <h3 className='text-[#212529] font-medium text-[15px]'>{task.name}</h3>
                    <p className='text-[#343A40] font-normal text-sm'>{formattedDescription}</p>
                </div>
            </div>

            <div className='flex justify-between w-full items-center'>
                <img src={task.employee.avatar} alt={task.employee.name} className='w-[31px] h-[31px] rounded-full'/>
                <div className='flex gap-[2.5px]'>
                    <Comment/>
                    <p>{task.total_comments}</p>
                </div>
            </div>
        </Card>
    );
}