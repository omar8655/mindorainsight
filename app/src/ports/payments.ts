export type CheckoutSessionInput = {
  productId: string
  email?: string
  successUrl: string
  cancelUrl: string
}

export type CheckoutSession = {
  id: string
  url: string
}

export interface PaymentsPort {
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSession>
  cancelSubscription(customerId: string): Promise<void>
}
