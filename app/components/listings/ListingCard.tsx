'use client'

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { HeartButton } from "../HeartButton";

interface ListingCardProps{
    data?: Listing;
    currentUser: User;
    reservations?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
    data,
    currentUser,
    reservations,
    onAction,
    disabled,
    actionId = '',
    actionLabel,
}) => {

    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data?.locationValue as string);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        if(disabled) return;

        onAction?.(actionId);

    },[onAction, actionId, disabled])

    const price = useMemo(() => {
        if(reservations){
            return reservations.totalPrice;
        }

        return data?.price;
    },[])

    const reservation = useMemo(() => {
        if(!reservations) return null;

        const start = new Date(reservations.startDate);
        const end = new Date(reservations.endDate);

        return `${format(start, `PP`)} - ${format(end, `PP`)}`;
    },[reservations])

    return (
        <div
            onClick={() => router.push(`/listings/${data?.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill
                        alt="Listing"
                        src={data?.image as string}
                        className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-110
                            transition
                        "
                    />

                    <div className="absolute top-3 right-3">
                        <HeartButton
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
