'use client'

import useRentModal from "@/app/hooks/useRentModal"
import { Modal } from "./Modal"
import { useMemo, useState } from "react";
import { Heading } from "../Heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { notification } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

export function RentModal() {

    const router = useRouter();
    const rentModal = useRentModal();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            image: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const image = watch('image');

    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
    }), [location]);

    const setCustomValue = (id: string, value: any) =>{
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                notification.success({
                    message: "Listing created!",
                    icon: 
                        <CheckCircleOutlined
                            className="success-noti"
                        />
                })
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
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

    const actionLable = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create'
        }

        return 'Next'
    },[step]);

    const secondaryActionLable = useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back'
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item, idx) => (
                    <div 
                        key={idx}
                        className="col-span-1" 
                    >
                        <CategoryInput 
                            onClick={(value) => setCustomValue('category', value)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng}/>
            </div>
        )
    }
    
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenitis do you have?"
                />
                <Counter
                    onChange={(value) => setCustomValue('guestCount', value)}
                    value={guestCount}
                    title="Guests" 
                    subtitle="How many guests do you allow?"
                />
                <hr />
                <Counter 
                    onChange={(value) => setCustomValue('roomCount', value)}
                    value={roomCount}
                    title="Rooms" 
                    subtitle="How many rooms do you have?"
                />
                <hr />
                <Counter 
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                    value={bathroomCount}
                    title="Bathrooms" 
                    subtitle="How many bathrooms do you have?"
                />
            </div>
        )
    }

    if(step === STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like?"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('image', value)}
                    value={image}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice 
                    type="number" 
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }


    return (
        <Modal
            title="Airbnb your home!"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLable}
            secondaryActionLabel={secondaryActionLable}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}