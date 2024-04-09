'use client'

import AlertModal from '@/components/modals/AlertModal'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAlertModal } from '@/hooks/useAlertModal'
import { deleteCoverLetter } from '@/lib/actions'
import { Trash2Icon } from 'lucide-react'
import React, { useEffect } from 'react'

type Props = {
    coverletterId: string
}

const DeleteCoverLetterButton = ({
    coverletterId
}: Props) => {
    const { toast } = useToast()
    const { setLoading, open, close, isOpen } = useAlertModal()

    const handleDelete = async () => {
        setLoading(true)
        const [_, error] = await deleteCoverLetter(coverletterId)
        if (error) {
            toast({
                title: "Something went wrong.",
                description: 'Could not delete the file',
                variant: 'destructive'
            })
        } else {
            toast({
                title: "Deleted successfully.",
            })
            close()
        }
        setLoading(false)
    }


    return (
        <>
            <Button
                onClick={open}
                size='icon'
                variant='destructive'
            >
                <Trash2Icon />

                <AlertModal
                    title="Are you sure you want to delete this cover letter?"
                    description="This action cannot be undone."
                    onConfirm={handleDelete}
                    isOpen={isOpen}
                />
            </Button>
        </>
    )
}

export default DeleteCoverLetterButton