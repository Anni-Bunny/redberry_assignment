import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Task} from "../interfaces/Task.ts";
import {api} from "../classes/API.ts";
import {TaskPriority} from "../components/TaskPriority.tsx";
import {Departments} from "../components/Departments.tsx";
import {Container} from "../components/Container.tsx";
import {PieChart} from "../assets/icons/PieChart.tsx";
import {Dropdown} from "../components/DropDown.tsx";
import {User} from "../assets/icons/User.tsx";
import {Calendar} from "../assets/icons/Calendar.tsx";
import {ChevronArrowDown} from "../assets/icons/ChevronArrowDown.tsx";
import {CheckBox} from "../components/Checkbox.tsx";
import {LeftArrow} from "../assets/icons/LeftArrow.tsx";

export function SingleTask() {
    const {id} = useParams()
    const [task, setTask] = useState<Task>()

    useEffect(() => {
        const taskId = Number(id);
        if (!isNaN(taskId)) {
            api.getTasks(taskId).then(function (res) {
                setTask(res.data)
            })
        }
    }, [id]);

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
                                <div className='flex gap-[70px] items-center h-1/3'>
                                    <div className='flex items-center justify-start gap-1.5 w-[164px]'>
                                        <PieChart/>
                                        <span>სტატუსი</span>
                                    </div>
                                    <div>
                                        <Dropdown title={String(task.status.name)}
                                                  mainDivClassName='w-[259px] h-[45px] border border-[#CED4DA] rounded-[5px] justify-start p-[14px]'
                                                  childClassName='w-full left-0 rounded-[5px] border-[#CED4DA]'
                                                  titleClassName='text-sm font-light text-[#0D0F10] w-full justify-between'
                                                  icon={<ChevronArrowDown/>}
                                        >
                                            <div className='flex flex-col gap-5'>
                                                <CheckBox
                                                    label={'დაბალი'}
                                                />
                                                <CheckBox
                                                    label={'საშუალო'}
                                                />
                                                <CheckBox
                                                    label={'მაღალი'}
                                                />
                                            </div>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className='flex gap-[70px] items-center h-1/3'>
                                    <div className='flex items-center justify-start gap-1.5 w-[164px]'>
                                        <User/>
                                        <span>თანამშრომელი</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-[11px] font-light justify-end text-[#474747]'>{task.department.name}</p>
                                        <div className='flex gap-3'>
                                            <img src={task.employee.avatar} alt={'img'} className='w-8'/>
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
                                        {task.due_date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className='w-[741px] h-[975px] border-[0.3px] border-[#DDD2FF] rounded-[10px] mt-[99px] bg-[#F8F3FEA6] py-10 px-[45px] flex flex-col gap-[66px]'>
                        <div
                            className='px-5 pt-[18px] pb-[15px] bg-[#FFFFFF] h-[135px] border-[0.3px] border-[#ADB5BD] rounded-[10px] flex flex-col gap-[30px]'>
                            <textarea placeholder='დაწერე კომენტარი' className='outline-0'/>

                            <div className='flex justify-end'>
                                <button
                                    className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>დააკომენტარე
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-10'>
                            <h3 className='font-medium text-xl flex gap-[7px]'>კომენტარები <span
                                className='bg-[#8338EC] w-[30px] rounded-[30px] p-2.5 text-white'>{task.total_comments}</span>
                            </h3>

                            <div className='flex gap-3'>
                                <img src={task.employee.avatar} alt={'img'} className='w-[38px]'/>
                                <div>
                                    <h3 className='text-[#212529] font-medium text-lg mb-2'>{task.employee.name}</h3>
                                    <p className='text-[#343A40] text-[16px] font-[350] mb-2.5'>comment</p>
                                    <button className='flex text-[#8338EC] text-xs font-normal gap-[6px]'><LeftArrow/> უპასუხე</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            }
        </>
    )
};