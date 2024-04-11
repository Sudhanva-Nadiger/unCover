"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createStipeCheckoutSession } from '@/lib/actions/stripeActions'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const UpgradeButton = ({ disabled }: { disabled?: boolean}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleClick = async () => {
    setLoading(true)
    const [response, error] = await createStipeCheckoutSession()
    setLoading(false)

    if (error || !response) {
      return toast({
        title: "Could not generate payment checkout session",
        variant: "destructive"
      })
    }

    if("message" in response) {
      return toast({
        title: response["message"]
      })
    }

    toast({
      title: 'Created the payment session successfully! Redirecting to payment page.'
    })

    window.location.href = response.url ?? '/dashboard/billing'
  }

  return (
    <Button disabled={loading || disabled} onClick={handleClick} className='w-full'>
      Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default UpgradeButton