'use client'

interface ButtonProps {
    label?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: any;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon,
}) => {
    return (
        <button 
            disabled={disabled}
            onClick={onClick}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                w-full
                ${outline ? 'bg-white' : 'bg-rose-500'}
                ${outline ? 'border-black' : 'bg-rose-500'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
                flex
                flex-row
                items-center
                text-center
                justify-center
                gap-x-2
            `}
        >
            {icon}
            {label}
        </button>   
    )
}
