'use client'

import Image from "next/image";
import { useRouter } from "next/navigation"

export function Logo() {
    const router = useRouter();

    return (
        <Image
            src={'/images/logo.png'}
            width={100}
            height={100}
            alt="Logo"
            className="hidden md:block cursor-pointer"
        />
    )
}