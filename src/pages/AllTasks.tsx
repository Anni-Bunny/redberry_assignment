import {Container} from "../components/Container.tsx";
import {Dropdown} from "../components/DropDown.tsx";
import {ChevronArrowDown} from "../assets/icons/ChevronArrowDown.tsx";
import {CheckBox} from "../components/Checkbox.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import {api} from "../classes/API.ts";
import {Task} from "../interfaces/Task.ts";
import {Status} from "../interfaces/Status.ts";
import {StatusColumn} from "../components/StatusColumn.tsx";
import {Department} from "../interfaces/department.ts";
import {Priority} from "../interfaces/Priority.ts";
import {Employee} from "../interfaces/employee.ts";


interface AllTasksFilter {
    departments: Department[],
    priorities: Priority[],
    employees: Employee[]
}


export const AllTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    const [statuses, setStatuses] = useState<Status[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [priorities, setPriorities] = useState<Priority[]>([])

    const [employees, setEmployees] = useState<Employee[]>([])

    const storedFilters = JSON.parse(localStorage.getItem('filters') as string) || {
        departments: [],
        priorities: [],
        employees: []
    };

    const [filters, setFilters] = useState<AllTasksFilter>(storedFilters)

    const filterKeys = Object.keys(filters) as (keyof AllTasksFilter)[];

    const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(filters.departments);
    const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>(filters.priorities);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>(filters.employees);

    //requests
    useEffect(() => {
        api.getStatuses().then(function (res) {
            setStatuses(res.data)
        })

        api.getPriorities().then(function (res) {
            setPriorities(res.data)
        })

        api.getDepartments().then(function (res) {
            setDepartments(res.data)
        })

        api.getEmployees().then(function (res) {
            setEmployees(res.data)
        })

        api.getTasks().then(function (res) {
            setTasks(res.data)
        })

    }, []);

    // main filter
    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters));
    }, [filters]);

    function HandleUpdateMainFilter() {

        // filter employees by departments
        setSelectedEmployees((selectedEmployees) =>
            selectedEmployees.filter(employee => depChecked(employee.department.id)
            ))

        setFilters(() => {

            return {
                departments: selectedDepartments,
                priorities: selectedPriorities,
                employees: selectedEmployees
            };
        });
    }

    function handleClickOutside(type: string) {
        switch (type) {
            case "department":
                setSelectedDepartments(() => filters.departments)
                break
            case "employee":
                setSelectedEmployees(() => filters.employees)
                break
            case "priority":
                setSelectedPriorities(() => filters.priorities)
                break
        }
    }

    // tasks
    function filterTasks(tasks: Task[]) {
        return tasks.filter(task => {
            const isDepartmentMatch = filters.departments.length === 0 || filters.departments.find(item => item.id === task.department.id);
            const isPriorityMatch = filters.priorities.length === 0 || filters.priorities.find(item => item.id === task.priority.id);
            const isEmployeeMatch = filters.employees.length === 0 || filters.employees.find(item => item.id === task.employee.id);

            return isDepartmentMatch && isPriorityMatch && isEmployeeMatch;
        })
    }

    const filteredTasks = useMemo(() => {
        return filterTasks(tasks)
    }, [tasks]);

    // department

    function handleSelectDepatrment(department: Department) {
        if (depChecked(department.id)) {
            setSelectedDepartments((oldSelectedDeps) => {
                return oldSelectedDeps.filter(dep => dep.id !== department.id)
            })
        } else {
            setSelectedDepartments((oldSelectedDeps) => {
                return [...oldSelectedDeps, department]
            })
        }
    }

    const depChecked = useCallback((id: number) => {
        return !!selectedDepartments?.find(dep => dep.id === id)
    }, [selectedDepartments]);

    // priority

    function handleSelectPriority(priority: Priority) {
        if (priorityChecked(priority.id)) {
            setSelectedPriorities((oldSelectedPriorities) => {
                return oldSelectedPriorities.filter(prio => prio.id !== priority.id);
            });
        } else {
            setSelectedPriorities((oldSelectedPriorities) => {
                return [...oldSelectedPriorities, priority];
            });
        }
    }

    const priorityChecked = useCallback((id: number) => {
        return !!selectedPriorities?.find(prio => prio.id === id);
    }, [selectedPriorities]);


    // employee

    function filterEmployees(employees: Employee[]) {
        return employees.filter(emp => filters.departments.length === 0 || filters.departments.find(dep => dep.id === emp.department.id))
    }

    const filteredEmployees = useMemo(() => {
        return filterEmployees(employees)
    }, [filters.departments, employees]);

    function handleSelectEmployee(employee: Employee) {
        if (employeeChecked(employee.id)) {
            setSelectedEmployees((oldSelectedEmployees) => {
                return oldSelectedEmployees.filter(emp => emp.id !== employee.id);
            });
        } else {
            setSelectedEmployees((oldSelectedEmployees) => {
                return [...oldSelectedEmployees, employee];
            });
        }
    }

    const employeeChecked = useCallback((id: number) => {
        return !!selectedEmployees?.find(emp => emp.id === id);
    }, [selectedEmployees]);

    return (
        <Container>
            <div className='flex flex-col'>
                <h1 className='text-[34px] font-semibold mt-10'>დავალებების გვერდი</h1>

                <div
                    className='w-[688px] h-11 border border-[#DEE2E6] rounded-[10px] mt-[52px] flex gap-[45px] justify-between items-center'>

                    <Dropdown title={'დეპარტამენტი'} icon={<ChevronArrowDown/>}
                              outsideClickCallback={() => handleClickOutside('department')}
                              childClassName='left-0 w-[688px] rounded-[10px] border-[#8338EC] pt-10 pb-5 px-[30px] gap-[25px]'
                              mainDivClassName='w-full'>
                        <div className='flex flex-col gap-[22px]'>
                            {departments.map(department => (
                                <CheckBox checked={depChecked(department.id)}
                                          onChange={() => handleSelectDepatrment(department)}
                                          key={`department_${department.id}`}
                                          label={department.name}/>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={HandleUpdateMainFilter}
                                    className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>არჩევა
                            </button>
                        </div>
                    </Dropdown>

                    <Dropdown title={'პრიორიტეტი'} icon={<ChevronArrowDown/>} mainDivClassName='w-full'
                              outsideClickCallback={() => handleClickOutside('priority')}
                              childClassName='w-[688px] rounded-[10px] border-[#8338EC] pt-10 pb-5 px-[30px] gap-[25px]'>
                        <div className='flex flex-col gap-[22px]'>
                            {priorities.map(priority => (
                                <CheckBox checked={priorityChecked(priority.id)}
                                          onChange={() => handleSelectPriority(priority)}
                                          key={`priority_${priority.id}`}
                                          label={priority.name}/>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={HandleUpdateMainFilter}
                                    className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>არჩევა
                            </button>
                        </div>
                    </Dropdown>

                    <Dropdown title={'თანამშრომელი'} icon={<ChevronArrowDown/>}
                              outsideClickCallback={() => handleClickOutside('employee')}
                              childClassName='right-0 w-[688px] rounded-[10px] border-[#8338EC] pt-10 pb-5 px-[30px] gap-[25px]'
                              mainDivClassName='w-full'>
                        <div className='flex flex-col gap-[22px]'>
                            {filteredEmployees.map(employee => (
                                <CheckBox checked={employeeChecked(employee.id)}
                                          onChange={() => handleSelectEmployee(employee)}
                                          key={`employee_${employee.id}`}
                                          image={employee.avatar}
                                          label={employee.name}/>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={HandleUpdateMainFilter}
                                    className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>არჩევა
                            </button>
                        </div>
                    </Dropdown>
                </div>

                <div className={"flex gap-2"}>
                    {
                        filterKeys.map(filter =>
                            filters[filter].map(item => {
                                const name = item.name || ''; // Safely get the name

                                return (
                                    <button key={`${filter}_${item.id}`} className="bg-red" name={filter}
                                            value={item.id}>
                                        {name}
                                    </button>
                                );
                            })
                        )
                    }
                </div>

                <div className='flex w-full justify-between items-start mt-[79px] gap-[52px]'>
                    {
                        statuses.map(status => <StatusColumn key={'status_' + status.id} status={status}
                                                             tasks={filteredTasks}/>)
                    }
                </div>
            </div>
        </Container>
    )
        ;
};