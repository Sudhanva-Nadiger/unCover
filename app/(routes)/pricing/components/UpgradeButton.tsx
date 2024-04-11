"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const UpgradeButton = ({ disabled }: { disabled?: boolean}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleClick = async () => {
    setLoading(true)
    const response = await fetch('/api/checkout')
    setLoading(false)

    if (!response.ok) {
      return toast({
        title: "Could not generate payment checkout session",
        variant: "destructive"
      })
    }

    const data = await response.json()

    if("message" in data) {
      return toast({
        title: data["message"]
      })
    }

    toast({
      title: 'Created the payment session successfully! Redirecting to payment page.'
    })

    window.location = data.url ?? '/dashboard/billing'
  }

  return (
    <Button disabled={loading || disabled} onClick={handleClick} className='w-full'>
      Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default UpgradeButton