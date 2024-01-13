'use client'

import { Container } from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { ListingReservation } from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { User } from "@prisma/client"
import { notification } from "antd";
import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser: User;
}

export const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser,
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<any>(initialDateRange);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
    
        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
        
            dates = [...dates, ...range];
        });
    
        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((items) => 
         items.label === listing.category);
    }, [listing.category]);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
          return loginModal.onOpen();
        }
        setIsLoading(true);
  
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            notification.success({
                message: "Listing reserved!",
                icon: 
                    <CheckCircleOutlined
                        className="success-noti"
                    />
            })
            setDateRange(initialDateRange);
            router.push('/trips');
        })
        .catch((error) => {
            notification.error({
                message: "Failed! Plaese try again!",
                description: error?.message,
                icon: 
                    <WarningOutlined
                        className="error-noti"
                    />
            })
        })
        .finally(() => {
            setIsLoading(false);
        })
    },
    [
        totalPrice, 
        dateRange, 
        listing?.id,
        router,
        currentUser,
        loginModal
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate, 
                dateRange.startDate
            );
            
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);
    
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.image}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div 
                        className="
                            grid 
                            grid-cols-1 
                            md:grid-cols-7 
                            md:gap-10 
                            mt-6
                        "
                    >
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div 
                            className="
                                order-first 
                                mb-10 
                                md:order-last 
                                md:col-span-3
                            "
                        >
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value: any) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}