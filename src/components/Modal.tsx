import {Input, Dialog, Field, Label, Transition, Select} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {Cancel} from "../assets/icons/Cancel.tsx";
import {Asterisk} from "../assets/icons/Asterisk.tsx";
import {useDropzone} from "react-dropzone";
import {Trash} from "../assets/icons/Trash.tsx";
import {DownArrow} from "../assets/icons/DownArrow.tsx";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Department} from "../interfaces/department.ts";
import {api} from "../classes/API.ts";
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { addEmployee } from '../store/slices/employeesSlice'
import { ValidationHint } from "./ValidationHint.tsx";


interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function Modal({isOpen, closeModal}: ModalProps) {

    const dispatch = useDispatch<AppDispatch>()

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [departments, setDeepartments] = useState<Department[]>([])

    // Validation
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            department: '',
            avatar: null,
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'მინიმუმ 2 სიმბოლო.')
                .max(255, 'მაქსიმუმ 255 სიმბოლო.')
                .required('სახელი სავალდებულოა.'),
            lastName: Yup.string()
                .min(2, 'მინიმუმ 2 სიმბოლო.')
                .max(255, 'მაქსიმუმ 255 სიმბოლო.')
                .required('გვარი სავალდებულოა.'),
            department: Yup.string().required('დეპარტამენტი სავალდებულოა.'),
            avatar: Yup.mixed().required('ავატარის ატვირთვა სავალდებულოა.'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.firstName);
            formData.append("surname", values.lastName);
            formData.append("department_id", values.department);
            if (values.avatar) {
                formData.append("avatar", values.avatar);
            }

            try {
                const res = await api.createEmployee(formData);
                dispatch(addEmployee(res.data));
                console.log('Employee created');
                handleClose();
            } catch (error) {
                console.error("Error creating employee", error);
            }
        }

    })


    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    if (file.size > 600 * 1024) {
                        formik.setFieldError('avatar', 'ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს.');
                        return;
                    }

                    setImagePreview(URL.createObjectURL(file));
                    formik.setFieldValue('avatar', file);
                };
            }
        }
    })

    const handleImageRemove = () => {
        setImagePreview(null)
        formik.setFieldValue('avatar', null)
    }


    const handleClose = () => {
        formik.resetForm();
        setImagePreview(null);
        closeModal();
    };


    useEffect(() => {
        api.getDepartments().then(res => {
            setDeepartments(res.data)
        })
    }, [])


    return (
        <Dialog open={isOpen} as="div" className="relative z-10" onClose={handleClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25"/>
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto backdrop-blur-[10px]">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className="h-[766px] w-[913px] rounded-[10px] px-[50px] pt-10 pb-[60px] bg-white flex flex-col gap-[37px]">
                            <div className="flex justify-end cursor-pointer" onClick={handleClose}>
                                <Cancel/>
                            </div>

                            <div className='flex flex-col items-center gap-[45px]'>
                                <Dialog.Title as="h3" className="text-[32px] font-medium text-[#212529]">
                                    თანამშრომლის დამატება
                                </Dialog.Title>

                                <form id={"employee-form"} onSubmit={formik.handleSubmit} className='h-[439px] flex flex-col w-full gap-[45px]'>

                                    <div className='flex justify-between gap-[45px]'>
                                        <Field className="flex-1/2">
                                            <Label className="text-sm/6 font-medium text-[#343A40] flex">
                                                სახელი <Asterisk className="mt-[3px]"/>
                                            </Label>
                                            <Input required={true}
                                                   name="firstName"
                                                   value={formik.values.firstName}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   className={ (formik.touched.firstName && formik.errors.firstName ? "border-[#FA4D4D]" : "border-[#DEE2E6]")  + " text-sm w-full rounded-[5px] border p-[14px] h-[45px] bg-[#FFFFFF] focus:outline-none"}/>
                                            <div className="mt-[6px] flex flex-col text-start">
                                                <ValidationHint
                                                    isValid={formik.values.firstName.length >= 2}
                                                    isTouched={formik.touched.firstName ?? false}
                                                    message="მინიმუმ 2 სიმბოლო."
                                                />
                                                <ValidationHint
                                                    isValid={formik.values.firstName.length <= 255 && formik.values.firstName.length > 0}
                                                    isTouched={formik.touched.firstName ?? false}
                                                    message="მაქსიმუმ 255 სიმბოლო"
                                                />
                                            </div>
                                        </Field>

                                        <Field className="flex-1/2">
                                            <Label className="text-sm/6 font-medium text-[#343A40] flex">
                                                გვარი <Asterisk className="mt-[3px]"/>
                                            </Label>
                                            <Input required={true}
                                                   name="lastName"
                                                   value={formik.values.lastName}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   className={ (formik.touched.lastName && formik.errors.lastName ? "border-[#FA4D4D]" : "border-[#DEE2E6]")  + " text-sm w-full rounded-[5px] border p-[14px] h-[45px] bg-[#FFFFFF] focus:outline-none"}/>
                                            <div className="mt-[6px] flex flex-col text-start">
                                                <ValidationHint
                                                    isValid={formik.values.lastName.length >= 2}
                                                    isTouched={formik.touched.lastName ?? false}
                                                    message="მინიმუმ 2 სიმბოლო."
                                                />
                                                <ValidationHint
                                                    isValid={formik.values.lastName.length <= 255 && formik.values.lastName.length > 0}
                                                    isTouched={formik.touched.lastName ?? false}
                                                    message="მაქსიმუმ 255 სიმბოლო"
                                                />
                                            </div>
                                        </Field>

                                    </div>

                                    <div>
                                        <label className="text-sm/6 font-medium text-[#343A40] flex">
                                            ავატარი <Asterisk className="mt-[3px]"/>
                                        </label>
                                        <div
                                            className={(formik.touched.avatar && formik.errors.avatar ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + " dropzone h-[120px] flex flex-col items-center justify-center border border-dashed "} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {imagePreview ? (
                                                <div className="relative">
                                                    <img src={imagePreview} alt="Preview"
                                                         className="rounded-full w-[88px] h-[88px] object-cover"/>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleImageRemove()
                                                        }}
                                                        className="cursor-pointer w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white border border-[#6C757D] absolute bottom-[3px] right-[3px]">
                                                        <Trash/>
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <p>ჩააგდე ფოტო აქ</p>
                                                    <em>(მხოლოდ *.jpeg და *.png)</em>
                                                    {formik.touched.avatar && formik.errors.avatar && (
                                                        <div className="text-red-500 text-sm mt-1">{formik.errors.avatar}</div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                    </div>

                                    <Field className="flex flex-col">
                                        <Label className="text-sm/6 font-medium text-[#343A40] flex">
                                            დეპარტამენტი <Asterisk className="mt-[3px]"/>
                                        </Label>
                                        <div className="relative w-fit ">
                                            <Select
                                                name="department"
                                                value={formik.values.department}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={ (formik.touched.department && formik.errors.department ? "border-[#FA4D4D]" : "border-[#DEE2E6]") + ' text-[14px] font-light cursor-pointer text-sm w-[384px] rounded-[5px] border  p-[14px] h-[45px] appearance-none '}
                                            >
                                                <option></option>
                                                {
                                                    departments.map((department) => (
                                                        <option className="text-[14px] font-light" key={department.id} value={department.id}>{department.name}</option>
                                                    ))
                                                }
                                            </Select>
                                            <DownArrow
                                                className="group pointer-events-none absolute top-[14px] right-[14px]"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </Field>

                                </form>
                            </div>

                            <div className="flex justify-end gap-[22px]">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-[#8338EC]  px-4 py-2 text-sm font-medium text-[#343A40] cursor-pointer"
                                    onClick={handleClose}
                                >
                                    გაუქმება
                                </button>

                                <button
                                    type="submit"
                                    form="employee-form"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-[#8338EC]  px-4 py-2 text-sm font-medium text-white cursor-pointer"
                                >
                                    დაამატე თანამშრომელი
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    )
}
