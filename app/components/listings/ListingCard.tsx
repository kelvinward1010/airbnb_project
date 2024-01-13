'use client'

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { HeartButton } from "../HeartButton";
import { Button } from "../Button";

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

    const reservationDate = useMemo(() => {
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                            listingId={data?.id as string}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data?.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        ${price}
                    </div>
                    {!reservations && (
                        <div className="font-light">
                            night
                        </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}
