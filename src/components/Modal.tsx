import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {Cancel} from "../assets/icons/Cancel.tsx";


interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function Modal({isOpen, closeModal}: ModalProps) {
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
                                <Dialog.Title
                                    as="h3"
                                    className="text-[32px] font-medium text-[#212529]"
                                >
                                    თანამშრომლის დამატება
                                </Dialog.Title>

                                <div className='h-[439px]'>
                                    <div className='flex gap-[45px]'>
                                    </div>

                                    <div></div>

                                    <div></div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    )
}
