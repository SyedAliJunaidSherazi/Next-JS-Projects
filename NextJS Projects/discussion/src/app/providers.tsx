'use client'
// we will make our providers file a client component and will use NextUiProvider just like wr use context provider in react but it will take care for all ui styling changes across the app
import { NextUIProvider } from "@nextui-org/react"

interface ProvidersProps{
    children: React.ReactNode;
}
export default function Providers({children}: ProvidersProps){
    return <NextUIProvider>{children}</NextUIProvider>
}
