import {Container} from "./Container.tsx";
import {Add} from "../assets/icons/Add.tsx";
import {Logo} from "../assets/Logo.tsx";

export const Header = () => {
    return (
        <Container>
            <header className='flex items-center justify-between h-[100px] w-full'>
                <div>
                    <Logo/>
                </div>

                <div className='flex gap-10'>
                    <button className='text-nowrap border border-[#8338EC] flex items-center justify-center h-10 rounded-[5px] cursor-pointer py-2.5 px-5 w-[225px] font-normal'>თანამშრომლის შექმნა</button>
                    <button className='bg-[#8338EC] flex items-center justify-center h-10 rounded-[5px] cursor-pointer py-2.5 px-5 gap-1 w-[268px] font-normal text-white'><Add/>შექმენი ახალი დავალება</button>
                </div>
            </header>
        </Container>
    );
};