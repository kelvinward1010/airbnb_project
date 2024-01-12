'use client'

import { IconBeach, IconCampfire, IconDiamond, IconSailboat, IconTower, IconWindmill } from "@tabler/icons-react";
import { Container } from "../Container";
import { CategoryBox } from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IconBoxModel2 } from "@tabler/icons-react";

export const categories = [
    {
        label: 'Beach',
        icon: <IconBeach />,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: <IconWindmill />,
        description: 'This property has windmills!'
    },
    {
        label: 'Modern',
        icon: <IconBoxModel2 />,
        description: 'This property is modern!'
    },
    {
        label: 'Countryside',
        icon: <IconWindmill />,
        description: 'This property is in the countryside!'
    },
    {
        label: 'Pools',
        icon: <IconWindmill />,
        description: 'This property has a pool!'
    },
    {
        label: 'Islands',
        icon: <IconWindmill />,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: <IconSailboat />,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Skiing',
        icon: <IconWindmill />,
        description: 'This property has skiing activities!'
    },
    {
        label: 'Castles',
        icon: <IconTower />,
        description: 'This property is in a castle!'
    },
    {
        label: 'Camping',
        icon: <IconCampfire />,
        description: 'This property has camping activities!'
    },
    {
        label: 'Arctic',
        icon: <IconWindmill />,
        description: 'This property has arctic!'
    },
    {
        label: 'Cave',
        icon: <IconWindmill />,
        description: 'This property is in a cave!'
    },
    {
        label: 'Desert',
        icon: <IconWindmill />,
        description: 'This property is in a desert!'
    },
    {
        label: 'Barns',
        icon: <IconWindmill />,
        description: 'This property is in the barn!'
    },
    {
        label: 'Lux',
        icon: <IconDiamond />,
        description: 'This property is luxurious!'
    },
]

export function Categories() {

    const params = useSearchParams();
    const categoryGet = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage) return null;

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((category, idx) => (
                    <CategoryBox
                        key={idx}
                        label={category.label}
                        selected={categoryGet === category.label}
                        icon={category.icon}
                    />
                ))}
            </div>
        </Container>
    )
}