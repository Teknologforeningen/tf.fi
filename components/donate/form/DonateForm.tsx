'use client'

import { useActionState } from 'react'
import Amount from './Sum'
import TextInput from './TextInput'
import VisibilitySelection, { VisibilityType } from './Visibility'
import Payment from './Payment'
import { Donation } from '@models/donate'
import { createPaymentAction, type PaymentResponse } from '@lib/barsborsen/payment'

const EditDonation = ({ donation, action }: { donation?: Donation; action: (fd: FormData) => void }) => {
  return (
    <form action={action}>
      <fieldset className="border border-darkgray not-prose p-4 pb-8 flex flex-col">
        <legend>
          <span className="px-2 text-lg font-bold uppercase">Donationsformulär</span>
        </legend>
        <TextInput
          label="För- och efternamn"
          id="donate-name"
          name="donate-name"
          placeholder="Svakar Teknolog"
          defaultValue={donation?.name}
          required
        />
        <TextInput
          label="E-post"
          id="donate-email"
          name="donate-email"
          type="email"
          placeholder="svakar@teknolog.fi"
          defaultValue={donation?.email}
          required
        />
        <VisibilitySelection visibility={donation?.visibility} />
        <Amount defaultValue={donation?.amount as number | undefined} />
        <button className="text-white bg-darkgray hover:bg-teknologröd transition-colors rounded-2xl mt-8 py-1.5">
          Välj betalningsmetod
        </button>
        <div className="flex flex-col text-sm pt-8 gap-4">
          <p>
            Läs mer om hantering av personuppgifter{' '}
            <a className="link" href="https://vision.tf.fi/registerbeskrivning">
              här
            </a>
            .
          </p>
          <p>
            Du kan efter din inbetalning ansluta dig till en grupp, eller skapa en ny grupp, för din inbetalning. Då är
            du synlig med gruppen t.ex. på denna hemsida. Du associeras också till gruppen i samband med möjlig
            synlighet i det nya nationshuset.
          </p>
          <p>
            Ifall du önskar donera som organisation eller företag, eller är intresserad av att bidra med värdepapper
            eller annan egendom, var vänlig och ta kontakt med fundraisingchefen Emil Kauppi:{' '}
            <a className="link" href="mailto:funchef@tf.fi">
              funchef@tf.fi
            </a>
            .
          </p>
        </div>
      </fieldset>
    </form>
  )
}

const PreviewDonation = ({ donation, onClick }: { donation: Donation; onClick?: (fd: FormData) => void }) => {
  let visibilityText: string
  if (donation.visibility.type === VisibilityType.visible) {
    visibilityText = 'Synlig'
  } else if (donation.visibility.type === VisibilityType.pseudonym) {
    visibilityText = donation.visibility.value
  } else {
    visibilityText = 'Anonym'
  }

  return (
    <form>
      <fieldset className="border border-darkgray not-prose p-4 pb-8 flex flex-col">
        <legend>
          <span className="px-2 text-lg font-bold uppercase">Donationsformulär</span>
          <button
            type="submit"
            formAction={onClick}
            className="bg-darkgray text-white rounded-2xl py-1 px-4 mx-2 text-sm"
          >
            Ändra
          </button>
        </legend>
        <div className="flex flex-col text-lg">
          <p>
            För- och efternamn: <i>{donation.name}</i>
          </p>
          <p>
            Synlighet: <i>{visibilityText}</i>
          </p>
          <p>
            E-post: <i>{donation.email}</i>
          </p>
          <p>
            Summa: <i>{donation.amount}</i> €
          </p>
        </div>
      </fieldset>
    </form>
  )
}

const DonateForm = () => {
  const [donateStep, formAction] = useActionState(createPaymentAction, { type: 'edit' })

  return donateStep.type === 'edit' ? (
    <EditDonation donation={donateStep.donation} action={formAction} />
  ) : (
    <div className="flex flex-col gap-8">
      <PreviewDonation donation={donateStep.donation} onClick={formAction} />
      <Payment payment={donateStep.payment} />
    </div>
  )
}

export type DonateStep =
  | { type: 'edit'; donation?: Donation }
  | { type: 'payment'; donation: Donation; payment: PaymentResponse }

export default DonateForm
