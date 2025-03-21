import {Check} from "../assets/icons/Check.tsx";

interface ValidationHintProps {
    isValid: boolean;
    isTouched: boolean;
    message: string;
}

export function ValidationHint({ isValid, isTouched, message }: ValidationHintProps) {
    const getColor = () => {
        if (isValid) return '#08A508';
        if (isTouched) return '#FA4D4D';
        return '#6C757D';
    };

    const color = getColor();

    return (
        <span className={`font-light flex gap-1 items-center text-[10px] text-[${color}]`}>
          <Check color={color} />
          <span>{message}</span>
        </span>
    );
}
