import {Container} from "./Container.tsx";
import {Add} from "../assets/icons/Add.tsx";
import {Logo} from "../assets/Logo.tsx";
import {useNavigate} from "react-router-dom";
import Modal from "./Modal.tsx";
import {useState} from "react";

export const Header = () => {
    const navigate = useNavigate();

    const handleNewTaskClick = () => {
        navigate("/createNewTask");
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    return (
        <>
            <header className=' w-full'>
                <Container className='flex items-center justify-between h-[100px] '>

                    <div onClick={handleLogoClick} className='cursor-pointer'>
                        <Logo/>
                    </div>

                    <div className='flex gap-10'>
                        <button onClick={openModal}
                                className='text-nowrap border border-[#8338EC] flex items-center justify-center h-10 rounded-[5px] cursor-pointer py-2.5 px-5 w-[225px] font-normal'>თანამშრომლის
                            შექმნა
                        </button>
                        <button
                            className='bg-[#8338EC] flex items-center justify-center h-10 rounded-[5px] cursor-pointer py-2.5 px-5 gap-1 w-[268px] font-normal text-white'
                            onClick={handleNewTaskClick}><Add/>შექმენი ახალი დავალება
                        </button>
                    </div>
                </Container>
            </header>

            <Modal isOpen={isOpen} closeModal={closeModal}/>

        </>
    );
};