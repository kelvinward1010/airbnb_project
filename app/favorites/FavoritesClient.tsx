'use client'

import { Listing, User } from "@prisma/client";
import { ListingCard } from "../components/listings/ListingCard";
import { Heading } from "../components/Heading";
import { Container } from "../components/Container";

interface FavoritesClientProps {
    listings: Listing[],
    currentUser?: User,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you favorited!"
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
                {listings.map((listing: any) => (
                    <ListingCard
                        currentUser={currentUser as User}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    );
}

export default FavoritesClient;