import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Task} from "../interfaces/Task.ts";
import {api} from "../classes/API.ts";
import {TaskPriority} from "../components/TaskPriority.tsx";
import {Departments} from "../components/Departments.tsx";
import {Container} from "../components/Container.tsx";
import {PieChart} from "../assets/icons/PieChart.tsx";
import {User} from "../assets/icons/User.tsx";
import {Calendar} from "../assets/icons/Calendar.tsx";
import {LeftArrow} from "../assets/icons/LeftArrow.tsx";
import {format} from "date-fns";
import {Comment} from "../interfaces/Comment.ts";
import {Select, Textarea} from "@headlessui/react";
import {DownArrow} from "../assets/icons/DownArrow.tsx";
import {Status} from "../interfaces/Status.ts";

export function SingleTask() {
    const {id} = useParams()

    const [task, setTask] = useState<Task>()
    const [comments, setComments] = useState<Comment[]>([])
    const [statuses, setStatuses] = useState<Status[]>([])

    const [selectedStatus, setSelectedStatus] = useState<Status>()

    useEffect(() => {
        api.getTaskComments(Number(id)).then((res) => {
            setComments(res.data)
        })
        api.getTasks(Number(id)).then(function (res) {
            setTask(res.data)
        })
        api.getStatuses().then(function (res) {
            setStatuses(res.data)
        })
    }, [id]);

    useEffect(() => {
        if (task)
            setSelectedStatus(task.status)
    }, [task]);

    async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const val = Number(e.target.value)
        const oldStatus = selectedStatus
        setSelectedStatus(statuses.find(stat => stat.id === val))

        if (task) {
            try {
                await api.changeTaskStatus({
                    id: task.id,
                    status_id: val
                });
            } catch (error) {
                console.error("Error creating employee", error);
                setSelectedStatus(oldStatus)
            }
        }
    }

    return (
        <>
            {task &&
                <Container className='flex gap-[223px] justify-between items-start'>
                    <div className='mt-10 flex flex-col gap-[63px]'>
                        <div className='w-[715px] h-[239px] flex flex-col gap-[26px]'>
                            <div className='flex flex-col py-2.5 gap-3'>
                                <div className='flex gap-[18px] items-center justify-start'>
                                    <TaskPriority type={task.priority.id} classname='w-[106px] h-[32px]'/>
                                    <Departments department={task.department} classname='px-2.5 h-[29px]'/>
                                </div>
                                <h1 className='text-[#212529] font-semibold text-[34px]'>{task.name}</h1>
                            </div>
                            <p className='text-[#343A40] font-normal text-lg leading-[150%]'>{task.description}</p>
                        </div>

                        <div className='w-[493px] h-[277px] flex flex-col gap-[18px]'>
                            <h1 className='text-2xl font-medium py-2.5 h-[49px]'>დავალების დეტალები</h1>
                            <div className='flex flex-col h-[210px]'>
                                <div className='flex gap-[70px] items-center justify-between h-1/3'>
                                    <div className='flex items-center justify-start gap-1.5 w-[164px]'>
                                        <PieChart/>
                                        <span>სტატუსი</span>
                                    </div>
                                    <div className="relative w-fit ">
                                        <Select
                                            name="status"
                                            onChange={handleStatusChange}
                                            value={selectedStatus?.id}
                                            className={'border-[#DEE2E6] cursor-pointer text-sm rounded-[5px] border w-[260px] p-[14px] h-[45px] appearance-none '}
                                        >
                                            {
                                                statuses.map((status) => (
                                                    <option key={'status' + status.id}
                                                            value={status.id}>{status.name}</option>
                                                ))
                                            }
                                        </Select>
                                        <DownArrow
                                            className="group pointer-events-none absolute top-[14px] right-[14px]"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-[70px] items-center justify-between h-1/3'>
                                    <div className='flex items-center justify-start gap-1.5'>
                                        <User/>
                                        <span>თანამშრომელი</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <img src={task.employee.avatar} alt={'img'}
                                             className='w-8 h-8 rounded-full object-cover'/>

                                        <div className='flex flex-col'>
                                            <p className='text-[11px] font-light justify-end text-[#474747]'>{task.department.name}</p>

                                            <p className='text-[#0D0F10] leading-[150%] text-sm'>{task.employee.name}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className='flex gap-[70px] items-center h-1/3'>
                                    <div className='flex items-center justify-start gap-1.5 w-[164px]'>
                                        <Calendar/>
                                        <span>დავალების ვადა</span>
                                    </div>
                                    <div>
                                        {format(new Date(task.due_date), "dd MMM, yyyy")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className='w-[741px] h-[975px] border-[0.3px] border-[#DDD2FF] rounded-[10px] mt-[99px] bg-[#F8F3FEA6] py-10 px-[45px] flex flex-col gap-[66px]'>

                        <label
                            className='px-5 pt-[18px] pb-[15px] bg-[#FFFFFF] h-[135px] border-[0.3px] border-[#ADB5BD] rounded-[10px] flex flex-col gap-[30px]'>
                            <Textarea placeholder='დაწერე კომენტარი' className='resize-none outline-0'/>

                            <div className='flex justify-end'>
                                <button
                                    className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>
                                    დააკომენტარე
                                </button>
                            </div>
                        </label>

                        <div className='flex flex-col gap-10'>
                            <div className="flex gap-[7px] items-center">
                                <h3 className='font-medium text-xl flex gap-[7px]'>
                                    კომენტარები
                                </h3>
                                <span
                                    className='font-medium text-sm bg-[#8338EC] rounded-[30px] px-[11px] py-[2.5px] text-white'>
                                    {comments.length}
                                </span>
                            </div>

                            <div className="flex flex-col gap-[38px] ">

                                {comments.map((comment) => (
                                    <div key={"comment_" + comment.id} className='flex gap-3'>
                                        <img src={comment.author_avatar} alt={'img'}
                                             className='h-[38px] w-[38px] rounded-full object-cover'/>
                                        <div className="flex-1">
                                            <h3 className='text-[#212529] font-medium text-lg mb-2'>{comment.author_nickname}</h3>
                                            <p className='text-[#343A40] text-[16px] font-[350] mb-2.5'>{comment.text}</p>
                                            <button className=' cursor-pointer flex text-[#8338EC] text-xs font-normal gap-[6px]'>
                                                <LeftArrow/> უპასუხე
                                            </button>

                                            {/*subComments*/}
                                            <div className='flex flex-col w-full gap-5 mt-5'>
                                                {
                                                    comment.sub_comments?.map((subComment) => (
                                                        <div key={"comment_" + subComment.id} className='flex gap-3'>
                                                            <img src={subComment.author_avatar} alt={'img'}
                                                                 className='h-[38px] w-[38px] rounded-full object-cover'/>
                                                            <div className="flex-1">
                                                                <h3 className='text-[#212529] font-medium text-lg mb-2'>{subComment.author_nickname}</h3>
                                                                <p className='text-[#343A40] text-[16px] font-[350] mb-2.5'>{subComment.text}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>


                        </div>

                    </div>
                </Container>
            }
        </>
    )
};