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
import { DonationLevels, StodProjektet } from '@payload-types'
import { JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'

// TODO: Move to some better place. The best solution would be to have custom components in one place.
export const CustomLinkComponent = ({ node }: { node: SerializedLinkNode }) => {
  const child = node.children[0]
  const text = 'text' in child ? child.text : ''
  const stringText = typeof text === 'string' ? text : ''
  return (
    <a className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" href={node.fields.url}>
      {stringText}
    </a>
  )
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  link: ({ node }) => <CustomLinkComponent node={node} />,
})

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
  visibilityText,
}: {
  donation?: Donation
  action: (fd: FormData) => void
  info?: Form['extraInfo']
  levels?: DonationLevels
  visibilityText?: string
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
        <TextInput
          label="Telefonnummer"
          id="donate-phone"
          name="donate-phone"
          type="tel"
          placeholder="+358401234567"
          defaultValue={donation?.phone}
          required
        />
        <VisibilitySelection visibility={donation?.visibility} visibilityText={visibilityText} />
        <Amount defaultValue={donation?.amount as number | undefined} levels={levels ?? []} />
        <button className="text-white bg-darkgray hover:bg-teknologröd transition-all rounded-2xl mt-8 py-1.5 active:scale-95">
          Välj betalningsmetod
        </button>
        {info && <RichText converters={jsxConverters} data={info} className="flex flex-col text-sm pt-8 gap-4" />}
      </fieldset>
    </form>
  )
}

type Form = NonNullable<StodProjektet['form']>

const DonateForm = ({ step, form }: { step?: DonateStep; form?: Form }) => {
  const defaultStep: DonateStep = step ?? { type: 'edit' }
  const [donateStep, formAction] = useActionState(createPaymentAction, defaultStep)

  return donateStep.type === 'edit' ? (
    <EditDonation
      donation={donateStep.donation}
      action={formAction}
      info={form?.extraInfo}
      levels={form?.donationLevels ?? []}
      visibilityText={form?.visibility}
    />
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
