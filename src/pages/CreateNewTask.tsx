import {Container} from "../components/Container.tsx";
import {Field, Input, Label, Select, Textarea} from "@headlessui/react";
import {Asterisk} from "../assets/icons/Asterisk.tsx";
import {ValidationHint} from "../components/ValidationHint.tsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {DownArrow} from "../assets/icons/DownArrow.tsx";
import {useEffect, useMemo, useState} from "react";
import {Status} from "../interfaces/Status.ts";
import {Department} from "../interfaces/department.ts";
import {Priority} from "../interfaces/Priority.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {api} from "../classes/API.ts";
import {loadEmployees} from "../store/slices/employeesSlice.ts";
import {Employee} from "../interfaces/employee.ts";
import {Calendar} from "../assets/icons/Calendar.tsx";
import {EmployeeSelect} from "../components/EmployeeSelect.tsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export const CreateNewTask = () => {

    const [hasLoaded, setHasLoaded] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const [statuses, setStatuses] = useState<Status[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [priorities, setPriorities] = useState<Priority[]>([])
    const employees = useSelector((state: RootState) => state.employees.data)

    function filterEmployees(employees: Employee[]) {
        return employees.filter(emp => Number(formik.values.department) === emp.department.id)
    }

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
            dispatch(loadEmployees(res.data))
        })

        loadFromLocalStorage()
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            priority: '',
            status: '',
            employee: '',
            due_date: '',
            department: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'მინიმუმ 3 სიმბოლო.')
                .max(255, 'მაქსიმუმ 255 სიმბოლო.')
                .required('სახელი სავალდებულოა.'),
            description: Yup.string()
                .test(
                    'min-words',
                    'მინიმუმ 4 სიტყვა.',
                    (value) => {
                        if (!value) return true; 
                        return value.trim().split(/\s+/).length >= 4;
                    }
                )
                .max(255, 'მაქსიმუმ 255 სიმბოლო.'),
            priority: Yup.string().required('პრიორიტეტი სავალდებულოა.'),
            status: Yup.string().required('სტატუსი სავალდებულოა.'),
            department: Yup.string().required('დეპარტამენტი სავალდებულოა.'),
            employee: Yup.string().required('თანამშრომელი სავალდებულოა.'),
            due_date: Yup.date().required('დედლაინი სავალდებულოა.')
                .min(new Date(new Date().setHours(0, 0, 0, 0)), 'დედლაინი არ შეიძლება წარსული იყოს.'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("due_date", new Date(values.due_date).toLocaleDateString('en-CA'));
            formData.append("status_id", values.status);
            formData.append("employee_id", values.employee);
            formData.append("priority_id", values.priority);

            try {
                await api.createTask(formData);
                console.log('Employee created');
                formik.resetForm();
                navigate('/');
            } catch (error) {
                console.error("Error creating employee", error);
            }
        },
    })

    function loadFromLocalStorage() {
        const saved = localStorage.getItem("taskCreateFormData");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                formik.setValues(parsed);
            } catch (e) {
                console.warn("Failed to parse saved form data");
            }
        }
        setHasLoaded(true);
    }

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem("taskCreateFormData", JSON.stringify(formik.values));
        }
    }, [formik.values, hasLoaded]);

    const filteredEmployees = useMemo(() => {
        return filterEmployees(employees)
    }, [formik.values.department, employees]);

    return (
        <>
            <Container>
                <h1 className="text-[34px] font-semibold text-[#212529]">შექმენი ახალი დავალება</h1>
            </Container>
            <Container
                className='bg-[#FBF9FFA6] border border-[#DDD2FF] mt-[25px] px-[55px] py-[65px] pt-10 flex-col justify-start items-start'>
                <form onSubmit={formik.handleSubmit} className='w-[1261px] flex flex-col gap-[55px]'>

                    <div className="gap-[161px] flex justify-between">
                        <Field className="flex-1">
                            <Label className="text-[16px] font-medium text-[#343A40] flex">
                                სახელი <Asterisk className="mt-[3px]"/>
                            </Label>
                            <Input name="name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   className={(formik.touched.name && formik.errors.name ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + " text-sm w-full rounded-[5px] border p-[14px] h-[45px] bg-[#FFFFFF] focus:outline-none"}/>
                            <div className="mt-[6px] flex flex-col text-start">
                                <ValidationHint
                                    isValid={formik.values.name.length >= 3}
                                    isTouched={formik.touched.name ?? false}
                                    message="მინიმუმ 3 სიმბოლო."
                                />
                                <ValidationHint
                                    isValid={formik.values.name.length <= 255 && formik.values.name.length > 0}
                                    isTouched={formik.touched.name ?? false}
                                    message="მაქსიმუმ 255 სიმბოლო"
                                />
                            </div>
                        </Field>

                        <Field className="flex-1">
                            <Label className="text-[16px] font-medium text-[#343A40] flex">
                                დეპარტამენტი <Asterisk className="mt-[3px]"/>
                            </Label>
                            <div className="relative w-full ">
                                <Select
                                    name="department"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={(formik.touched.department && formik.errors.department ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + ' cursor-pointer text-sm rounded-[5px] border w-full  p-[14px] h-[45px] appearance-none '}
                                >
                                    <option></option>
                                    {
                                        departments.map((department) => (
                                            <option key={department.id}
                                                    value={department.id}>{department.name}</option>
                                        ))
                                    }
                                </Select>
                                <DownArrow
                                    className="group pointer-events-none absolute top-[14px] right-[14px]"
                                    aria-hidden="true"
                                />
                            </div>
                        </Field>
                    </div>

                    <div className="gap-[161px] flex justify-between">
                        <Field className="flex-1">
                            <Label className="text-[16px] font-medium text-[#343A40] flex">
                                აღწერა
                            </Label>
                            <Textarea name="description"
                                      value={formik.values.description}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      className={(formik.touched.description && formik.errors.description ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + " resize-none text-sm w-full rounded-[5px] border p-[14px] h-[133px] bg-[#FFFFFF] focus:outline-none"}/>
                            <div className="mt-[6px] flex flex-col text-start">
                                <ValidationHint
                                    isValid={formik.values.description.trim().split(/\s+/).length >= 4}
                                    isTouched={formik.touched.description ?? false}
                                    message="მინიმუმ 4 სიტყვა."
                                />
                                <ValidationHint
                                    isValid={formik.values.description.length <= 255 && formik.values.description.length > 0}
                                    isTouched={formik.touched.description ?? false}
                                    message="მაქსიმუმ 255 სიმბოლო"
                                />
                            </div>
                        </Field>

                        <Field className="flex-1">
                            <Label className="text-[16px] font-medium text-[#343A40] flex">
                                პასუხისმგებელი თანამშრომელი <Asterisk className="mt-[3px]"/>
                            </Label>
                            <EmployeeSelect
                                employees={filteredEmployees}
                                value={formik.values.employee}
                                onChange={(val) => formik.setFieldValue('employee', val) }
                                onBlur={() => formik.setFieldTouched('employee', true)}
                                touched={formik.touched.employee}
                                error={formik.errors.employee as string}
                            />
                        </Field>
                    </div>

                    <div className="gap-[161px] flex justify-between">
                        <div className="flex gap-[32px] flex-1">
                            <Field className="flex flex-col">
                                <Label className="text-[16px] font-medium text-[#343A40] flex">
                                    პრიორიტეტი <Asterisk className="mt-[3px]"/>
                                </Label>
                                <div className="relative w-fit ">
                                    <Select
                                        required={true}
                                        name="priority"
                                        value={formik.values.priority}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={(formik.touched.priority && formik.errors.priority ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + ' cursor-pointer text-sm  w-[260px] rounded-[5px] border  p-[14px] h-[45px] appearance-none '}
                                    >
                                        <option></option>
                                        {
                                            priorities.map((priority) => (
                                                <option key={'priority_' + priority.id}
                                                        value={priority.id}>{priority.name}</option>
                                            ))
                                        }
                                    </Select>
                                    <DownArrow
                                        className="group pointer-events-none absolute top-[14px] right-[14px]"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Field>

                            <Field className="flex flex-col">
                                <Label className="text-[16px] font-medium text-[#343A40] flex">
                                    სტატუსი <Asterisk className="mt-[3px]"/>
                                </Label>
                                <div className="relative w-fit ">
                                    <Select
                                        name="status"
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={(formik.touched.status && formik.errors.status ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + ' cursor-pointer text-sm rounded-[5px] border w-[260px] p-[14px] h-[45px] appearance-none '}
                                    >
                                        <option></option>
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
                            </Field>
                        </div>

                        <div className="flex-1">
                            <Field className="flex flex-col">
                                <Label className="text-[16px] font-medium text-[#343A40] flex">
                                    დედლაინი <Asterisk className="mt-[3px]"/>
                                </Label>
                                <div className="relative w-fit ">
                                    <DatePicker
                                        selected={formik.values.due_date ? new Date(formik.values.due_date) : null}
                                        onChange={(date) => formik.setFieldValue('due_date', date)}
                                        minDate={new Date()}
                                        dateFormat='dd/MM/yyyy'
                                        placeholderText='DD/MM/YYYY'
                                        className={(formik.touched.due_date && formik.errors.due_date ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + ' cursor-pointer text-sm  w-[260px] rounded-[5px] border pl-[36px] p-[14px] h-[45px] appearance-none '}
                                    />
                                    <Calendar
                                        className="group pointer-events-none absolute top-[14px] left-[14px]"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Field>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button type='submit'
                                className="text-[18px] font-normal rounded-[5px] bg-[#8338EC] text-white cursor-pointer px-[20px] py-[10px]">
                            დავალების შექმნა
                        </button>
                    </div>
                </form>
            </Container>
        </>
    );
};