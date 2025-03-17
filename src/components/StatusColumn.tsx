import {TaskCard} from "./TaskCard.tsx";
import {Task} from "../interfaces/Task.ts";
import {Status} from "../interfaces/Status.ts";
import {Link} from "react-router-dom";

const statusColors = ['bg-[#3A86FF]', 'bg-[#F7BC30]', 'bg-[#FB5607]', 'bg-[#FF006E]']


export function StatusColumn({status, tasks}: { status: Status, tasks: Task[] }) {


    const bgColor = statusColors[(status.id % statusColors.length)];

    return (
        <div className='flex justify-center flex-col gap-[30px]'>
            <div
                className={`w-[381px] h-[54px] flex justify-center items-center rounded-[10px] py-[15px] ${bgColor} text-white text-xl font-medium`}>
                {status.name}
            </div>

            {
                tasks && tasks.map((task) => task.status.id === status.id &&
                    <Link to={"/tasks/" + task.id} key={task.id}>
                        <TaskCard key={'task_' + task.id} task={task}/>
                    </Link>)
            }
        </div>
    );
};