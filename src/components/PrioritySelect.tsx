import { Listbox } from '@headlessui/react'
import { Fragment, useCallback } from 'react'
import { DownArrow } from '../assets/icons/DownArrow.tsx'
import { priorityTypes } from './TaskPriority.tsx'
import { Priority } from '../interfaces/Priority.ts'

interface PrioritySelectProps {
    value: number
    onChange: (value: number) => void
    onBlur: () => void
    touched?: boolean
    error?: string
    priorities: Priority[]
}

export function PrioritySelect({ value, onChange, onBlur, touched, error, priorities }: PrioritySelectProps) {
    const priorityType = useCallback((id: number) => priorityTypes[(id - 1) % priorityTypes.length], [])
    const selected = priorities.find(p => p.id === value)

    return (
        <div className="relative w-full">
            <Listbox value={value} onChange={onChange}>
                <div className="relative">
                    <Listbox.Button
                        onBlur={onBlur}
                        className={`cursor-pointer text-sm rounded-[5px] border w-[260px] p-[14px] h-[45px] flex items-center justify-between ${
                            touched && error ? 'border-[#FA4D4D]' : 'border-[#DEE2E6]'
                        }`}
                    >
                        {selected ? (
                            <div className="flex items-center gap-1 w-[86px] h-[26px]">
                                <div>{priorityType(selected.id).icon}</div>
                                <p className="text-[14px] font-light leading-[150%]">{selected.name}</p>
                            </div>
                        ) : (
                            <span className="text-gray-400 text-[14px] font-light"></span>
                        )}
                        <DownArrow className="pointer-events-none absolute top-[14px] right-[14px]" />
                    </Listbox.Button>

                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
                        <Listbox.Option value={''} as={Fragment}>
                            {({ selected }) => (
                                <li className={`list-none cursor-pointer select-none px-4 py-2 h-[41px] ${selected ? 'bg-gray-100' : ''}`}>
                                    <span className="text-gray-400"></span>
                                </li>
                            )}
                        </Listbox.Option>
                        {priorities.map(priority => (
                            <Listbox.Option key={priority.id} value={priority.id} as={Fragment}>
                                {({ selected }) => (
                                    <li className={`cursor-pointer select-none px-4 py-2 flex items-center gap-2 ${selected ? 'bg-gray-100' : ''}`}>
                                        <div className="flex items-center gap-1 w-[86px] h-[26px]">
                                            <div>{priorityType(priority.id).icon}</div>
                                            <p className="text-[14px] font-light leading-[150%]">{priority.name}</p>
                                        </div>
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
