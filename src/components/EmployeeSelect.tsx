import {Listbox} from '@headlessui/react'
import {Fragment} from 'react'
import {Employee} from "../interfaces/employee.ts";
import {DownArrow} from "../assets/icons/DownArrow.tsx"; // adjust this import if needed

interface EmployeeSelectProps {
    employees: Employee[]
    value: string
    onChange: (value: string) => void
    onBlur: () => void
    touched?: boolean
    error?: string
}

export function EmployeeSelect({
                                   employees,
                                   value,
                                   onChange,
                                   onBlur,
                                   touched,
                                   error,
                               }: EmployeeSelectProps) {
    const selectedEmployee = employees.find((e) => e.id === Number(value))

    return (
        <div className="relative w-full">
            <Listbox value={value} onChange={onChange}>
                <div className="relative">
                    <Listbox.Button
                        onBlur={onBlur}
                        className={`cursor-pointer text-sm rounded-[5px] border w-full p-[14px] h-[45px] appearance-none flex items-center justify-between ${
                            touched && error ? 'border-[#FA4D4D]' : 'border-[#DEE2E6]'
                        }`}
                    >
                        {selectedEmployee ? (
                            <div className="flex items-center gap-2 overflow-hidden">
                                <img
                                    src={selectedEmployee.avatar}
                                    alt={`${selectedEmployee.name} ${selectedEmployee.surname}`}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-[14px] font-light truncate">
                                  {selectedEmployee.name} {selectedEmployee.surname}
                                </span>
                            </div>
                        ) : (
                            <span className="text-gray-400"></span>
                        )}
                        <DownArrow className="pointer-events-none absolute top-[14px] right-[14px]"/>
                    </Listbox.Button>

                    <Listbox.Options
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
                        {employees.map((employee) => (
                            <Listbox.Option
                                key={`employee_${employee.id}`}
                                value={employee.id}
                                as={Fragment}
                            >
                                {({selected}) => (
                                    <li
                                        className={`cursor-pointer select-none px-4 py-2 flex items-center gap-2 hover:bg-gray-100 ${
                                            selected ? 'bg-gray-200' : ''
                                        }`}
                                    >
                                        <img
                                            src={employee.avatar}
                                            alt={`${employee.name} ${employee.surname}`}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className="text-[14px] font-light" >{employee.name} {employee.surname}</span>
                                    </li>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    )
}
