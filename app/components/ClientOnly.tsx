'use client'
import { useEffect, useState } from 'react'

interface OnlyClientProps{
    children?: React.ReactNode
}

export const ClientOnly: React.FC<OnlyClientProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() =>{
        setHasMounted(true);
    },[])

    if(!hasMounted){
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}
