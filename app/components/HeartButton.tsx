'use client'

import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { User } from "@prisma/client";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps{
    listingId: string;
    currentUser?: User;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser,
}) => {

    const {hasFavorited, toggleFavorite} = useFavorite({
        listingId,
        currentUser,
    });

    return (
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <HeartOutlined 
                className="
                    text-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                    z-2
                "
            />

            <HeartFilled
                className={`
                    ${hasFavorited ? "text-red-500" : "fill-neutral-500/70"}
                    absolute
                    -top-[2px]
                    -right-[2px]
                    z-1
                `}
            />
        </div>
    )
}