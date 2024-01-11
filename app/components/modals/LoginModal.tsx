'use client'

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons"
import { notification } from "antd";
import useLoginModal from "@/app/hooks/useLoginModal";

export function LoginModal() {

    const loginModal = useLoginModal();
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

        axios.post(`api/login`, data)
            .then(() => {
                loginModal.onClose();
                notification.success({
                    message: "Successfully!",
                    icon: 
                        <CheckCircleOutlined
                            className="success-noti"
                        />
                })
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

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to AirBnB"
                subtitle="Login!"
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

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}
