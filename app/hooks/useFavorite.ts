import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";
import { notification } from "antd";

interface IUseFavorite {
  listingId: string;
  currentUser?: User
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();

    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            notification.success({
                message: "Success!"
            })
        } catch (error) {
            notification.error({
                message: "Failed! Plaese try again!",
            })
        }
    }, 
    [
        currentUser, 
        hasFavorited, 
        listingId, 
        loginModal,
        router
    ]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;