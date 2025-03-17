import {Container} from "../components/Container.tsx";
import {Dropdown} from "../components/DropDown.tsx";
import {ChevronArrowDown} from "../assets/icons/ChevronArrowDown.tsx";
import {CheckBox} from "../components/Checkbox.tsx";
import {useEffect, useState} from "react";
import {api} from "../classes/API.ts";
import {Task} from "../interfaces/Task.ts";
import {Status} from "../interfaces/Status.ts";
import {StatusColumn} from "../components/StatusColumn.tsx";


export const AllTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [statuses, setStatuses] = useState<Status[]>([])

    useEffect(() => {
        api.getStatuses().then(function (res){
            setStatuses(res.data)
        })

        api.getTasks().then(function (res) {
            setTasks(res.data)
        })

    }, []);

    return (
        <Container>
            <div className='flex flex-col'>
                <h1 className='text-[34px] font-semibold mt-10'>დავალებების გვერდი</h1>

                <div
                    className='w-[688px] h-11 border border-[#DEE2E6] rounded-[10px] mt-[52px] flex gap-[45px] justify-between items-center'>
                    <Dropdown title={'დეპარტამენტი'} icon={<ChevronArrowDown/>} childClassName='left-0 w-[688px] rounded-[10px] border-[#8338EC] pt-10 pb-5 px-[30px] gap-[25px]' mainDivClassName='w-full'/>
                    <Dropdown title={'პრიორიტეტი'} icon={<ChevronArrowDown/>} mainDivClassName='w-full' childClassName='w-[688px] rounded-[10px] border-[#8338EC] pt-10 pb-5 px-[30px] gap-[25px]'>

                        <div>
                            <div className='flex flex-col gap-[22px]'>
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
                        </div>

                        <div className='flex justify-end'>
                            <button
                                className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>არჩევა
                            </button>
                        </div>

                    </Dropdown>
                    <Dropdown title={'თანამშრომელი'} icon={<ChevronArrowDown/>} childClassName='right-0 w-[688px] rounded-[10px] border-[#8338EC] pt-10 pb-5 px-[30px] gap-[25px]' mainDivClassName='w-full'/>
                </div>

                <div className='flex w-full justify-between items-start mt-[79px] gap-[52px]'>
                    {
                        statuses.map(status => <StatusColumn key={'status_' + status.id} status={status} tasks={tasks}/>)
                    }
                </div>
            </div>
        </Container>
    )
        ;
};