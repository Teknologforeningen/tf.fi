'use client'

import { useActionState } from 'react'
import Amount from './Sum'
import TextInput from './TextInput'
import VisibilitySelection from './Visibility'
import Payment from './Payment'
import { Donation } from '@models/donate'
import { createPaymentAction, type PaymentResponse } from '@lib/barsborsen/payment'
import { DonationPreview } from '@components/donate/form/DonationPreview'
import ErrorDialog from '@components/donate/ErrorDialog'

export const FailedToFetchProvidersError = () => (
  <ErrorDialog>
    Ett okänt fel inträffade och betalningsmetoderna kunde inte hämtas. Var vänlig att dubbelkolla donationsuppgifterna.
    Om det inte hjälper, kontakta oss på{' '}
    <a className="link-text" href="mailto:funchef@tf.fi">
      funchef@tf.fi
    </a>
  </ErrorDialog>
)

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

const DonateForm = ({ step }: { step?: DonateStep }) => {
  const defaultStep: DonateStep = step ?? { type: 'edit' }
  const [donateStep, formAction] = useActionState(createPaymentAction, defaultStep)

  return donateStep.type === 'edit' ? (
    <EditDonation donation={donateStep.donation} action={formAction} />
  ) : (
    <div className="flex flex-col gap-8">
      <DonationPreview donation={donateStep.donation} action={formAction} />
      {donateStep.payment ? <Payment payment={donateStep.payment} /> : <FailedToFetchProvidersError />}
    </div>
  )
}

export type DonateStep =
  | { type: 'edit'; donation?: Donation }
  | { type: 'payment'; donation: Donation; payment: PaymentResponse | null }

export default DonateForm
