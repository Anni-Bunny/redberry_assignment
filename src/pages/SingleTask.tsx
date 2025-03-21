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
import {format} from "date-fns";
import {Comment} from "../interfaces/Comment.ts";
import {Select} from "@headlessui/react";
import {DownArrow} from "../assets/icons/DownArrow.tsx";
import {Status} from "../interfaces/Status.ts";
import {CommentItem} from "../components/CommentItem.tsx";
import {CommentForm} from "../components/CommentForm.tsx";

export function SingleTask() {
    const {id} = useParams()

    const [task, setTask] = useState<Task>()
    const [comments, setComments] = useState<Comment[]>([])
    const [statuses, setStatuses] = useState<Status[]>([])

    const [selectedStatus, setSelectedStatus] = useState<Status>()

    const [commentText, setCommentText] = useState('');

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

    async function handleCommentSubmit() {
        if (!commentText.trim() || !task) return;

        try {
            await api.createTaskComment({
                task_id: task.id,
                text: commentText
            });

            const res = await api.getTaskComments(task.id);
            setComments(res.data);
            setCommentText('');
        } catch (error) {
            console.error("Failed to post comment", error);
        }
    }

    async function handleReply() {
        if (task) {
            const res = await api.getTaskComments(task.id);
            setComments(res.data);
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
                                                    <option key={'status_' + status.id}
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

                    <div className='w-[741px] h-[975px] border-[0.3px] border-[#DDD2FF] rounded-[10px] mt-[99px]
                        bg-[#F8F3FEA6] py-10 px-[45px]
                        flex flex-col justify-between gap-[66px]'>

                        <CommentForm
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onSubmit={handleCommentSubmit}
                        />

                        <div className='flex flex-1 flex-col gap-10 overflow-hidden justify-between'>
                            <div className="flex gap-[7px] items-center">
                                <h3 className='font-medium text-xl flex gap-[7px]'>
                                    კომენტარები
                                </h3>
                                <span
                                    className='font-medium text-sm bg-[#8338EC] rounded-[30px] px-[11px] py-[2.5px] text-white'>
                                    {comments.length}
                                </span>
                            </div>

                            {/* comments */}
                            <div className="flex flex-col gap-[38px] flex-1 justify-between overflow-y-auto ">

                                {comments.map((comment) => (
                                    <CommentItem key={"comment_" + comment.id} comment={comment} onReplayCallback={handleReply} />
                                ))}

                            </div>

                        </div>

                    </div>
                </Container>
            }
        </>
    )
}