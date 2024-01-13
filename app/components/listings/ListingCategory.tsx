'use client';

interface ListingCategoryProps {
    icon: any,
    label: string,
    description: string
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon,
    label,
    description
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                {icon}
                <div className="flex flex-col">
                    <div
                        className="text-lg font-semibold"
                    >
                        {label}
                    </div>
                    <div
                        className="text-neutral-500 font-light"
                    >
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingCategory;