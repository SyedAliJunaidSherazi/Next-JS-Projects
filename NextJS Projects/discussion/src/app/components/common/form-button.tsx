'use client'
// this will be our form submit and loader client component for button, we will use it inside its parent form component and it will utiloze the useFormStatus Hook
import React from "react";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";


interface FormButtonProps{
    children: React.ReactNode;
}
export default function FormButton({children} : FormButtonProps){
    const {pending} = useFormStatus();
    console.log("Pending value:", pending);

    return <Button type="submit" isLoading={pending}>
        {children}
    </Button>

}