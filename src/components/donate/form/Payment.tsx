'use client'

import type { PaymentGroup, PaymentProvider, PaymentResponse } from '@lib/barsborsen/payment'

const Payment = ({ payment }: { payment: PaymentResponse }) => {
  const providers = payment.providers
  const groups = payment.groups?.filter((group) => group.name)
  if (!providers || !groups)
    return <PaymentError message="Kunde inte hämta betalningsmetoder. Försök att ändra på donationen." />

  return (
    <fieldset className="border border-darkgray not-prose p-4 pb-8 flex flex-col gap-4">
      <legend>
        <span className="px-2 text-lg font-bold uppercase">Betalningsmetod</span>
      </legend>
      {groups.map((group) => (
        <PaymentGroup
          key={group.id}
          name={group.name!}
          providers={providers.filter((provider) => provider.group === group.id)}
        />
      ))}
    </fieldset>
  )
}

const PaymentGroup = ({ name, providers }: { name: string; providers: PaymentProvider[] }) => {
  return (
    <>
      <h3 className="italic text-lg">{name}</h3>
      <div className="grid grid-cols-4 justify-center items-end gap-5">
        {providers.map((provider) => (
          <PaymentProvider key={provider.name} provider={provider} />
        ))}
      </div>
    </>
  )
}

const PaymentProvider = ({ provider }: { provider: PaymentProvider }) => {
  return (
    <form key={provider.name} action={provider.url} method="POST" className="border h-full">
      {provider.parameters?.map((param) => (
        <input type="hidden" key={param.name} name={param.name} value={param.value} />
      ))}
      <button className="h-full p-1">
        <img className="m-0 h-full" src={provider.svg} alt={provider.name} width={140} />
      </button>
    </form>
  )
}

const PaymentError = ({ message }: { message: string }) => (
  <div className="border p-4 text-lg">
    <p>{message}</p>
  </div>
)

export default Payment
