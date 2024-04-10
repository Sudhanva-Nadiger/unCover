"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const showSuccessImage = (variant === 'default' || variant === undefined)
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex gap-4 items-center">
              <div className="h-full aspect-square rounded-full">
                <Image
                  src={showSuccessImage ? '/success.png' : '/error.png'}
                  alt="toast image"
                  width={50}
                  height={50}
                  className="object-fill rounded-full"
                />
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
