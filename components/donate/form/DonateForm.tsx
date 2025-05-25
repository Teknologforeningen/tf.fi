'use client'

import { useActionState } from 'react'
import Amount from './Sum'
import TextInput from './TextInput'
import VisibilitySelection from './Visibility'
import Payment from './Payment'
import { Donation, DonationLevel } from '@models/donate'
import { createPaymentAction, type PaymentResponse } from '@lib/barsborsen/payment'
import { DonationPreview } from '@components/donate/form/DonationPreview'
import ErrorDialog from '@components/donate/ErrorDialog'
import { marked, RendererObject } from 'marked'

const renderer: RendererObject = {
  link(href, _, text) {
    return `<a class="text-blue-600 underline visited:text-purple-600 hover:text-blue-800 break-all" href=${href}>${text}</a>`
  },
}

marked.use({ renderer })

export const FailedToFetchProvidersError = () => (
  <ErrorDialog>
    Ett okänt fel inträffade och betalningsmetoderna kunde inte hämtas. Var vänlig att dubbelkolla donationsuppgifterna.
    Om det inte hjälper, kontakta oss på{' '}
    <a className="link-text" href="mailto:funchef@tf.fi">
      funchef@tf.fi
    </a>
  </ErrorDialog>
)

const EditDonation = ({
  donation,
  action,
  info,
  levels,
}: {
  donation?: Donation
  action: (fd: FormData) => void
  info?: string
  levels?: DonationLevel[]
}) => {
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
        <Amount defaultValue={donation?.amount as number | undefined} levels={levels} />
        <button className="text-white bg-darkgray hover:bg-teknologröd transition-colors rounded-2xl mt-8 py-1.5">
          Välj betalningsmetod
        </button>
        {info && (
          <div
            className="flex flex-col text-sm pt-8 gap-4"
            dangerouslySetInnerHTML={{
              __html: marked.parse(info),
            }}
          />
        )}
      </fieldset>
    </form>
  )
}

const DonateForm = ({ step, info, levels }: { step?: DonateStep; info?: string; levels?: DonationLevel[] }) => {
  const defaultStep: DonateStep = step ?? { type: 'edit' }
  const [donateStep, formAction] = useActionState(createPaymentAction, defaultStep)

  return donateStep.type === 'edit' ? (
    <EditDonation donation={donateStep.donation} action={formAction} info={info} levels={levels} />
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
