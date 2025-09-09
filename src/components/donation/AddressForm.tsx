'use client'

import TextInput from '@components/donate/form/TextInput'
import { useActionState } from 'react'
import { setAddress } from '@lib/barsborsen/payment'

export interface Address {
  street: string
  zipCode: string
  city: string
  country: string
}

const AddressForm = ({ transactionId, address }: { transactionId: string; address?: Address }) => {
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments
  const boundSetAddress = setAddress.bind(null, transactionId)
  const [state, action, isPending] = useActionState(boundSetAddress, '')

  return (
    <form action={action}>
      <input hidden readOnly />
      <p>
        Ifall du är intresserad av att få ditt donationsmärke hemskickat, ange din adress nedan (märket går också att
        avhämta från Urdsgjallar, kontakta i dessa fall funchef@tf.fi):
      </p>
      <fieldset className="border border-darkgray not-prose p-4 pb-8 flex flex-col">
        <legend>
          <span className="px-2 text-lg font-bold uppercase">Address</span>
        </legend>
        <TextInput name="address-street" placeholder="Otsvängen 22" label="Gata" defaultValue={address?.street} />
        <TextInput name="address-zip-code" placeholder="02150" label="Postnummer" defaultValue={address?.zipCode} />
        <TextInput name="address-city" placeholder="Esbo" label="Ort" defaultValue={address?.city} />
        <TextInput name="address-country" placeholder="Finland" label="Land" defaultValue={address?.country} />
        <button
          disabled={isPending}
          className="text-white disabled:opacity-75 bg-darkgray hover:bg-teknologröd transition-colors rounded-2xl mt-8 py-1.5"
        >
          {isPending ? 'Sparar...' : 'Spara'}
        </button>
        <p className="self-center mt-2 text-lg font-medium">{state}</p>
      </fieldset>
    </form>
  )
}

export default AddressForm
