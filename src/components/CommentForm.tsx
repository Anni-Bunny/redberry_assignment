import {Textarea} from "@headlessui/react";

interface CommentFormProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    className?: string;
}

export function CommentForm({ value, onChange, onSubmit, className }: CommentFormProps) {
    return (
        <label className={`${className} px-5 pt-[18px] pb-[15px] bg-[#FFFFFF] h-[135px] border-[0.3px] border-[#ADB5BD] rounded-[10px] flex flex-col gap-[30px]`}>
            <Textarea
                placeholder='დაწერე კომენტარი'
                className='resize-none outline-0'
                value={value}
                onChange={onChange}
            />
            <div className='flex justify-end'>
                <button
                    onClick={onSubmit}
                    className='cursor-pointer w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] py-2 px-5 text-white flex justify-center items-center'
                >
                    დააკომენტარე
                </button>
            </div>
        </label>
    );
}