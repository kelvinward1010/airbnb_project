'use client'

interface CategoryInputProps {
    onClick: (value: string) => void;
    label?: string;
    icon?: any;
    selected?: boolean;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({
    icon,
    label,
    selected,
    onClick,
}) => {
    return (
        <div
            onClick={() => onClick(label as string)}
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            {icon}
            <div className="font-semibold">
                {label}
            </div>
        </div>
    )
}