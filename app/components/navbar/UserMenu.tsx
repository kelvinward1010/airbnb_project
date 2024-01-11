'use client'

import { UserOutlined } from "@ant-design/icons"
import { IconMenu2 } from "@tabler/icons-react"
import { Avatar } from "antd"
import { useCallback, useState } from "react"
import { MenuItem } from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"

export function UserMenu() {

    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const toggleOpen = useCallback(() =>{
        setIsOpen((value) => !value);
    },[])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={() => {}}
                >
                    Airbnb your home
                </div>
                <div 
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                    onClick={toggleOpen}
                >
                    <IconMenu2 />
                    <div className="hidden md:block">
                        <Avatar icon={<UserOutlined />} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[100px] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem 
                                onClick={loginModal.onOpen}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={registerModal.onOpen}
                                label="Sign Up"
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}