'use server'

import type { Donation } from '@models/donate'
import { barsborsenUrl } from '@lib/barsborsen/index'
import { type Visibility, VisibilityType } from '@components/donate/form/Visibility'
import { DonateStep } from '@components/donate/form/DonateForm'

function extractDonation(formData: FormData): Donation {
  const name = formData.get('donate-name')
  if (!name) {
    throw Error('Missing name')
  }

  const email = formData.get('donate-email')
  if (!email) {
    throw new Error('Missing email')
  }

  const visibilityType = formData.get('donate-visibility')
  const pseudonym = formData.get('donate-pseudonym')
  if (!visibilityType) {
    throw new Error('Missing visibility')
  }
  if (visibilityType === VisibilityType.pseudonym && !pseudonym) {
    throw new Error('Missing pseudonym')
  }

  const visibility: Visibility = {
    type: visibilityType as VisibilityType,
    value: pseudonym as string,
  }

  const amount = formData.get('donate-amount')
  if (!amount) {
    throw new Error('Missing amount')
  }

  return {
    name: name as string,
    email: email as string,
    amount: amount as string,
    visibility,
  }
}

export async function createPaymentAction(prevState: DonateStep, formData: FormData): Promise<DonateStep> {
  if (prevState.type === 'payment') {
    return {
      type: 'edit',
      donation: prevState.donation,
    }
  }

  const donation = extractDonation(formData)
  const providers = await fetchProviders(donation)
  if (!providers) {
    throw new Error('Failed to fetch providers')
  }
  return {
    type: 'payment',
    donation: donation,
    payment: providers,
  }
}

export interface PaymentGroup {
  id?: string
  name?: string
  icon?: string
  svg?: string
}

export interface PaymentProvider {
  name?: string
  id?: string
  url?: string
  icon?: string
  svg?: string
  group?: string
  parameters?: {
    name?: string
    value?: string
  }[]
}

export interface PaymentResponse {
  transactionId?: string
  href?: string
  reference?: string
  terms?: string
  groups?: PaymentGroup[]
  providers?: PaymentProvider[]
}

export async function fetchProviders(donation: Donation): Promise<PaymentResponse | null> {
  if (barsborsenUrl === undefined) return null

  const body = {
    name: donation.name,
    email: donation.email,
    visibility: donation.visibility.type,
    pseudonym: donation.visibility.type === VisibilityType.pseudonym ? donation.visibility.value : '',
    sum: donation.amount,
  }

  const res = await fetch(`${barsborsenUrl}/payments/providers`, { method: 'POST', body: JSON.stringify(body) })
  return res.json()
}

interface Donor {
  name?: string
  pseudonym?: string
  email?: string
  address?: string
  zip_code?: string
  city?: string
  country?: string
}

export interface Contribution {
  donor?: Donor
  visibility?: string
  sum?: string
  greeting?: string
  group_name?: string
}

export interface Payment {
  checkout_transaction_id?: string
  status?: string
  contribution?: Contribution
}

export async function fetchPayment(checkoutTransactionId: string): Promise<Payment> {
  const res = await fetch(`${barsborsenUrl}/payments/transaction/${checkoutTransactionId}`)
  return res.json()
}

interface SumResponse {
  total_sum?: string
}

export async function fetchSum(): Promise<string | undefined> {
  const res = await fetch(`${barsborsenUrl}/donations/sum`)
  const body: SumResponse = await res.json()
  return body.total_sum
}

export async function setGroup(transactionId: string, group: string): Promise<void> {
  console.log(`Setting ${transactionId} group to "${group}"`)
  const res = await fetch(`${barsborsenUrl}/payments/transaction/${transactionId}/group`, {
    method: 'PUT',
    body: group,
  }).then((r) => r.text())
  console.log(`Set group response for ${transactionId}:`, res)
}

export async function setAddress(transactionId: string, prevState: string, formData: FormData): Promise<string> {
  const extract = (field: string): string | null => {
    const value = formData.get(field)
    if (!value || typeof value !== 'string' || value === '') return null
    return value
  }

  const street = extract('address-street')
  const zipCode = extract('address-zip-code')
  const city = extract('address-city')
  const country = extract('address-country')

  if (!street || !zipCode || !city || !country) return 'Vänligen fyll i alla fält'

  const body = {
    street,
    zipCode,
    city,
    country,
  }

  try {
    console.log(`Saving address for ${transactionId}`)
    await fetch(`${barsborsenUrl}/payments/transaction/${transactionId}/address`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    console.log(`Successfully saved address for ${transactionId}`)
  } catch (e) {
    console.error(`Failed to post new address for ${transactionId}`, e)
    return 'Addressen gick inte att spara. Försök vänligen på nytt.'
  }

  return 'Addressen sparad!'
}
