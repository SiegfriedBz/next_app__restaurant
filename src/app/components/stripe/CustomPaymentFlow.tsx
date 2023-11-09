'use client'

import { useCallback, useEffect, useState } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

type Props = {
  orderId: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const CustomPaymentFlow = ({ orderId }: Props) => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  )

  const getStripeClientSecret = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/stripe/create-intent/${orderId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (!response.ok) throw new Error('Failed to fetch client secret')

      const data = await response.json()

      const { clientSecret } = data
      setClientSecret(clientSecret)
    } catch (error) {
      console.log(error)
    }
  }, [orderId])

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    ;(async () => {
      await getStripeClientSecret()
    })()
  }, [getStripeClientSecret])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'stripe' },
  }

  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      )}
    </div>
  )
}

export default CustomPaymentFlow
