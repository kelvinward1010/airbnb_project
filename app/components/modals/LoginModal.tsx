'use client'

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { CheckCircleOutlined, GithubOutlined, GoogleOutlined, WarningOutlined } from "@ant-design/icons"
import { notification } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export function LoginModal() {

    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false
        })
            .then(() => {
                notification.success({
                    message: "Login sucessfully!",
                    icon: 
                        <CheckCircleOutlined
                            className="success-noti"
                        />
                })
                router.refresh();
                loginModal.onClose();
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
    }

    const onSocialAction = (action: string) => {
        signIn(action, {
            redirect: false
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to AirBnB"
                subtitle="Login to your account!"
                center
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type={'email'}
            />
            <Input 
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type={'password'}
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={<GoogleOutlined />}
                onClick={()=> onSocialAction('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={<GithubOutlined />}
                onClick={()=> onSocialAction('github')}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="flex flex-row justify-center items-center gap-2">
                    <p>Do not have an account?</p>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Sign Up
                    </div>
                </div>
            </div>
        </div>  
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
