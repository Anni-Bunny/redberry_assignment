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
import {FilterItem} from "../components/FilterItem.tsx";


interface AllTasksFilter {
    departments: Department[],
    priorities: Priority[],
    employee: Employee | null
}


export const AllTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    const [statuses, setStatuses] = useState<Status[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [priorities, setPriorities] = useState<Priority[]>([])

    const [employees, setEmployees] = useState<Employee[]>([])

    const clearFiters = {
        departments: [],
        priorities: [],
        employee: null
    }


    const storedFilters = JSON.parse(localStorage.getItem('filters') as string) || clearFiters;

    const [filters, setFilters] = useState<AllTasksFilter>(storedFilters)


    const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(filters.departments);
    const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>(filters.priorities);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(filters.employee);

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

    function handleClickOutside(type: string) {
        switch (type) {
            case "department":
                setSelectedDepartments(() => filters.departments)
                break
            case "employee":
                setSelectedEmployee(() => filters.employee)
                break
            case "priority":
                setSelectedPriorities(() => filters.priorities)
                break
        }
    }

    function clearAllFilters() {
        setFilters(clearFiters)
        setSelectedDepartments([])
        setSelectedPriorities([])
        setSelectedEmployee(null)
    }

    // tasks
    function filterTasks(tasks: Task[]) {
        return tasks.filter(task => {
            const isDepartmentMatch = filters.departments.length === 0 || filters.departments.find(item => item.id === task.department.id);
            const isPriorityMatch = filters.priorities.length === 0 || filters.priorities.find(item => item.id === task.priority.id);
            const isEmployeeMatch = filters.employee === null || filters.employee?.id === task.employee.id;

            return isDepartmentMatch && isPriorityMatch && isEmployeeMatch;
        })
    }

    const filteredTasks = useMemo(() => {
        return filterTasks(tasks)
    }, [filters,tasks]);

    // department

    function handleToggleDepatrment(department: Department) {
        if (depChecked(department.id)) {
            const newSelectedDepartments = selectedDepartments.filter(dep => dep.id !== department.id)
            setSelectedDepartments(newSelectedDepartments)
            return newSelectedDepartments
        } else {
            const newSelectedDepartments = [...selectedDepartments, department]
            setSelectedDepartments(newSelectedDepartments)
            return newSelectedDepartments
        }
    }

    function handleFilterByDepartments(departments?: Department[]) {
        let updatedEmployee = selectedEmployee
        const updatedDepartments = departments ?? selectedDepartments

        // Filter employees by departments
        if (updatedEmployee && updatedDepartments.length && !depChecked(updatedEmployee.department.id)) {
            updatedEmployee = null
            setSelectedEmployee(null);
        }

        setFilters({
            priorities: filters.priorities,
            departments: updatedDepartments,
            employee: updatedEmployee
        });
    }

    const depChecked = useCallback((id: number) => {
        return !!selectedDepartments?.find(dep => dep.id === id)
    }, [selectedDepartments]);

    // priority

    function handleTogglePriority(priority: Priority) {
        if (priorityChecked(priority.id)) {
            const newSelectedPriorities = selectedPriorities.filter(prio => prio.id !== priority.id)
            setSelectedPriorities(newSelectedPriorities);
            return newSelectedPriorities
        } else {
            const newSelectedPriorities = [...selectedPriorities, priority]
            setSelectedPriorities(newSelectedPriorities);
            return newSelectedPriorities
        }
    }

    function handleFilterByPriorities(priorities?: Priority[]) {
        setFilters({
            ...filters,
            priorities: priorities ?? selectedPriorities,
        });
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

    const employeeChecked = useCallback((id: number) => {
        return selectedEmployee?.id === id;
    }, [selectedEmployee]);

    function HandleFilterByEmployee(employee?:Employee|null) {
        setFilters({
            ...filters,
            employee: employee === null ? employee : selectedEmployee
        });
    }

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
                                          onChange={() => handleToggleDepatrment(department)}
                                          key={`department_${department.id}`}
                                          label={department.name}/>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => handleFilterByDepartments()}
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
                                          onChange={() => handleTogglePriority(priority)}
                                          key={`priority_${priority.id}`}
                                          label={priority.name}/>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => handleFilterByPriorities()}
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
                                          onChange={() => setSelectedEmployee(employee)}
                                          key={`employee_${employee.id}`}
                                          image={employee.avatar}
                                          label={employee.name}/>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => HandleFilterByEmployee()}
                                    className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'>არჩევა
                            </button>
                        </div>
                    </Dropdown>
                </div>

                <div className={"flex gap-2 mt-[24px]"}>
                    {filters.departments.map(item => (
                        <FilterItem
                            key={`filter_departments_${item.id}`}
                            label={item.name}
                            onRemove={() => {
                                handleFilterByDepartments(handleToggleDepatrment(item));
                            }}
                        />
                    ))}

                    {filters.priorities.map(item => (
                        <FilterItem
                            key={`filter_priorities_${item.id}`}
                            label={item.name}
                            onRemove={() => {
                                handleFilterByPriorities(handleTogglePriority(item))
                            }}
                        />
                    ))}
                    { filters.employee &&
                        <FilterItem
                            key={`filter_employees_${filters.employee.id}`}
                            label={filters.employee.name}
                            onRemove={() => {
                                setSelectedEmployee(null);
                                HandleFilterByEmployee(null);
                            }}
                        />
                    }

                    {
                        !!(filters.departments.length || filters.employee || filters.priorities.length) &&
                        <span className="text-sm items-center flex px-[10px] py-[6px] text-[#343A40] cursor-pointer" onClick={clearAllFilters}>გასუფთავება</span>
                    }
                </div>


                <div className='flex w-full justify-between items-start mt-[24px] gap-[52px]'>
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