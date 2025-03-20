import {X} from "../assets/icons/X.tsx";

interface FilterItemProps {
    label: string;
    onRemove: () => void;
}

export function FilterItem ({ label, onRemove }: FilterItemProps) {
    return (
        <span className="text-sm items-center flex gap-1 text-[#343A40] border border-[#CED4DA] rounded-3xl px-[10px] py-[6px]">
          <span>{label}</span>
          <button className="cursor-pointer" onClick={onRemove}>
            <X className="w-[14px] h-[14px]" />
          </button>
        </span>
    );
};
