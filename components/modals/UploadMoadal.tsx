'use client'

import React from 'react'
import Modal from '../Modal'
import UploadDropzone from '../Uploader'
import { useAuth } from '@clerk/nextjs'
import { useUploadModal } from '@/hooks/useUploadModal'


const UploadMoadal = ({
    isSubscribed
}: {
    isSubscribed?: boolean
}) => {
    const { userId } = useAuth()
    const { isOpen, onClose } = useUploadModal()

    return (
        <Modal
            title='Upload Resume'
            description=' Upload your resume based on which your cover letter will be cooked 🎭.'
            isOpen={isOpen}
            onClose={onClose}
        >
            <UploadDropzone isSubscribed={isSubscribed}  userId={userId!} />
        </Modal>
    )
}

export default UploadMoadal