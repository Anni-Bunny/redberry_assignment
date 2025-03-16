const departments = {
    1:{
        name: 'ადმინისტრ.',
        bgColor: 'bg-green-400'
    },
    2: {
        name: 'HRM',
        bgColor: 'bg-[#FF66A8]'
    },
    3: {
        name: 'ფინანსები',
        bgColor: 'bg-emerald-400'
    },
    4: {
        name: 'მარკეტინგი',
        bgColor: 'bg-[#FD9A6A]'
    },
    5:{
        name: 'ლოჯოსტიკა',
        bgColor: 'bg-[#89B6FF]'
    },
    6:{
        name: 'ინფ. ტექ.',
        bgColor: 'bg-[#FFD86D]'
    },
    7:{
        name: 'მედია',
        bgColor: 'bg-fuchsia-400'
    }
}

export type department = keyof typeof departments

export function Departments ({department = 1}:{department:department}){
    return (
        <div className={`w-[88px] h-6 rounded-[15px] py-[5px] px-[9px] flex gap-x-2.5 text-white font-normal text-xs items-center justify-center ${departments[department].bgColor}`}>
            {departments[department].name}
        </div>
    );
};
