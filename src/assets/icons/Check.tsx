export const Check = ({className, color}: { className?: string, color?:string }) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={color ?? "#6C757D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
};