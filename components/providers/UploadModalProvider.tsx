"use client";

import { useState, useEffect } from "react";

import UploadModal from "@/components/modals/UploadMoadal";

export const UploadModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <UploadModal />
    )
}