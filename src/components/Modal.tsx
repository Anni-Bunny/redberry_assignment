import {Input, Dialog, Field, Label, Transition, Select} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {Cancel} from "../assets/icons/Cancel.tsx";
import {Asterisk} from "../assets/icons/Asterisk.tsx";
import {Check} from "../assets/icons/Check.tsx";
import {useDropzone} from "react-dropzone";
import {Trash} from "../assets/icons/Trash.tsx";
import {DownArrow} from "../assets/icons/DownArrow.tsx";


interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function Modal({isOpen, closeModal}: ModalProps) {

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1, // Limit to 1 file
        onDrop: (acceptedFiles) => {
            // Show preview of the uploaded image
            const file = acceptedFiles[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                setImagePreview(objectUrl);
            }
        }
    });


    const handleImageRemove = () => {
        setImagePreview(null);
    };

    return (
        <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
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
                            <div className="flex justify-end cursor-pointer" onClick={closeModal}>
                                <Cancel/>
                            </div>

                            <div className='flex flex-col items-center gap-[45px]'>
                                <Dialog.Title as="h3" className="text-[32px] font-medium text-[#212529]">
                                    თანამშრომლის დამატება
                                </Dialog.Title>

                                <div className='h-[439px] flex flex-col w-full gap-[45px]'>

                                    <div className='flex justify-between gap-[45px]'>
                                        <Field className="flex-1/2">
                                            <Label className="text-sm/6 font-medium text-[#343A40] flex">
                                                სახელი <Asterisk className="mt-[3px]"/>
                                            </Label>
                                            <Input required={true}
                                                   className="text-sm w-full rounded-[5px] border border-[#DEE2E6] p-[14px] h-[45px] bg-[#FFFFFF] focus:outline-none"/>
                                            <div className="mt-[6px] flex flex-col text-start">
                                                <span className="flex gap-1 items-center text-sm/6 text-[#6C757D]">
                                                    <Check/>
                                                    <span>მინიმუმ 2 სიმბოლო.</span>
                                                </span>
                                                <span className="flex gap-1 items-center text-sm/6 text-[#6C757D]">
                                                    <Check/>
                                                    <span>მინიმუმ 255 სიმბოლო</span>
                                                </span>
                                            </div>
                                        </Field>

                                        <Field className="flex-1/2">
                                            <Label className="text-sm/6 font-medium text-[#343A40] flex">
                                                გვარი <Asterisk className="mt-[3px]"/>
                                            </Label>
                                            <Input required={true}
                                                   className="text-sm w-full rounded-[5px] border border-[#DEE2E6] p-[14px] h-[45px] bg-[#FFFFFF] focus:outline-none"/>
                                            <div className="mt-[6px] flex flex-col text-start">
                                                <span className="flex gap-1 items-center text-sm/6 text-[#6C757D]">
                                                    <Check/>
                                                    <span>მინიმუმ 2 სიმბოლო.</span>
                                                </span>
                                                <span className="flex gap-1 items-center text-sm/6 text-[#6C757D]">
                                                    <Check/>
                                                    <span>მინიმუმ 255 სიმბოლო</span>
                                                </span>
                                            </div>
                                        </Field>

                                    </div>

                                    <div>
                                        <label className="text-sm/6 font-medium text-[#343A40] flex">
                                            ავატარი <Asterisk className="mt-[3px]"/>
                                        </label>
                                        <div
                                            className="dropzone h-[120px] flex flex-col items-center justify-center border border-dashed border-[#CED4DA]" {...getRootProps()}>
                                            <input required={true} {...getInputProps()} />
                                            {imagePreview ? (
                                                <div className="relative">
                                                    <img src={imagePreview} alt="Preview"
                                                         className="rounded-full w-[88px] h-[88px] object-cover"/>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleImageRemove()
                                                        }} // Remove image when clicked
                                                        className="cursor-pointer w-[24px] h-[24px] overflow-hidden flex items-center justify-center rounded-full bg-white border border-[#6C757D] absolute bottom-[3px] right-[3px]">
                                                        <Trash/>
                                                    </button>
                                                </div>
                                            ) : <>
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                                <em>(Only *.jpeg and *.png images will be accepted)</em>
                                            </>}
                                        </div>

                                    </div>

                                    <Field className="flex flex-col">
                                        <Label className="text-sm/6 font-medium text-[#343A40] flex">
                                            დეპარტამენტი <Asterisk className="mt-[3px]"/>
                                        </Label>
                                        <div className="relative w-fit ">
                                            <Select
                                                className={'cursor-pointer text-sm w-[384px] rounded-[5px] border border-[#DEE2E6] p-[14px] h-[45px] appearance-none '}
                                            >
                                                <option className="text-sm" value="active">Active</option>
                                                <option className="text-sm" value="22">22</option>
                                            </Select>
                                            <DownArrow
                                                className="group pointer-events-none absolute top-[14px] right-[14px]"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </Field>

                                </div>
                            </div>

                            <div className="flex justify-end gap-[22px]">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-[#8338EC]  px-4 py-2 text-sm font-medium text-[#343A40] cursor-pointer"
                                    onClick={closeModal}
                                >
                                    გაუქმება
                                </button>

                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-[#8338EC]  px-4 py-2 text-sm font-medium text-white cursor-pointer"
                                    onClick={closeModal}
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
