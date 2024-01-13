'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation } from "@/app/types";
import { notification } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";
import { User } from "@prisma/client";

interface ReservationsClientProps {
    reservations: SafeReservation[],
    currentUser: User,
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                notification.success({
                    message: "Deleted sucessfully!",
                    icon: 
                        <CheckCircleOutlined
                            className="success-noti"
                        />
                })
                router.refresh();
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
                setDeletingId('');
            })
    }, [router]);

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div
                className="
                    mt-10
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {reservations.map((reservation: any) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservations={reservation as SafeReservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default ReservationsClient;