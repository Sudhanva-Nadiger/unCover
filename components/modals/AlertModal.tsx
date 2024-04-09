'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader } from "lucide-react"
import { buttonVariants } from "../ui/button"
import { useAlertModal } from "@/hooks/useAlertModal";
import { useEffect, useState } from "react";

const AlertModal = ({
    title,
    description,
    onConfirm,
    isOpen
}: {
    title: string
    description?: string
    onConfirm: () => Promise<void>
    isOpen: boolean
}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const { loading, close, setLoading } = useAlertModal()

    if (!mounted) return null

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {
                        loading ? (
                            <div className="flex w-full justify-center items-center">
                                <Loader className='h-6 w-6 animate-spin' />
                            </div>
                        ) : (
                            <>
                                <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={async () => {
                                    setLoading(true)
                                    await onConfirm()
                                    close()
                                }} className={buttonVariants({
                                    variant: 'destructive'
                                })}>Delete</AlertDialogAction>
                            </>
                        )
                    }

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertModal