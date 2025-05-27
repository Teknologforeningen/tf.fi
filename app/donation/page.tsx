'use server'

import Image from 'next/image'
import Thanks from '@components/donation/Thanks'
import GroupDonation from '@components/donation/GroupDonation'
import { fetchDonors } from '@lib/barsborsen/donors'
import { redirect, RedirectType } from 'next/navigation'
import { fetchPayment, fetchProviders, fetchSum, Payment, setGroup } from '@lib/barsborsen/payment'
import DonateForm, { DonateStep } from '@components/donate/form/DonateForm'
import { Donation } from '@models/donate'
import { Visibility, VisibilityType } from '@components/donate/form/Visibility'
import ErrorDialog from '@components/donate/ErrorDialog'
import { DonationPreview } from '@components/donate/form/DonationPreview'

const LandingImage = () => (
  <div className="relative">
    <div className="absolute w-1/3 h-1/3 bg-koppargron bottom-0 -translate-x-3 -translate-y-6" />
    <div className="absolute w-1/3 h-1/3 bg-koppargron right-0 translate-x-3 translate-y-6" />
    <Image
      src="/images/vera-michelangelo-56.jpg"
      alt="Vera Michelangelo"
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
      className="relative w-full h-auto"
    />
  </div>
)

const ErrorPage = async ({ donation }: { payment: Payment; donation: Donation }) => {
  const providers = await fetchProviders(donation)

  const step: DonateStep = { type: 'payment', donation, payment: providers }

  return (
    <>
      <LandingImage />
      <PaymentError />
      <DonateForm step={step} />
    </>
  )
}

const Page = async ({ searchParams }: { searchParams: Promise<{ [_key: string]: string | string[] | undefined }> }) => {
  const params = await searchParams
  const paymentStatusOk = params['betalning'] === 'ok'
  const checkoutTransactionId = params['checkout-transaction-id']
  if (!checkoutTransactionId || typeof checkoutTransactionId === 'object') {
    redirect('/donera', RedirectType.replace)
  }

  const [donors, payment, sum] = await Promise.all([fetchDonors(), fetchPayment(checkoutTransactionId), fetchSum()])

  const donation = paymentToDonation(payment)

  if (!donation) {
    return <p>Donationen kunde inte hittas.</p>
  }

  if (!paymentStatusOk) {
    return <ErrorPage payment={payment} donation={donation} />
  }

  async function selectGroup(group: string) {
    'use server'
    if (typeof checkoutTransactionId === 'string') {
      await setGroup(checkoutTransactionId, group)
    }
  }

  return (
    <>
      <LandingImage />
      {paymentStatusOk && payment.contribution && sum && (
        <>
          <Thanks transactionId={checkoutTransactionId} contribution={payment.contribution} sum={sum} />
          {donors?.groups && <GroupDonation groups={donors.groups} selectGroup={selectGroup} />}
          <p>
            En länk till denna bekräftelsesida har skickats till din e-postadress (kolla skräpposten) med en kopia av
            nedanstående uppgifter du tillgivit:
          </p>
          <DonationPreview donation={donation} />
        </>
      )}
    </>
  )
}

const PaymentError = () => (
  <ErrorDialog>Betalningen misslyckades. Var vänlig och dubbelkolla dina uppgifter, försök sedan på nytt.</ErrorDialog>
)

function paymentToDonation(payment: Payment): Donation | null {
  const contribution = payment.contribution
  if (!contribution) return null

  const donor = contribution.donor
  if (!donor) return null

  const { name, email, phone, pseudonym } = donor
  if (!name || !email || !phone) return null

  const visibilityType = payment.contribution?.visibility
  if (!visibilityType) return null
  if (visibilityType === VisibilityType.pseudonym && !pseudonym) return null

  const visibility: Visibility = {
    type: visibilityType as VisibilityType,
    value: pseudonym as string,
  }

  const amount = payment.contribution?.sum
  if (!amount) return null

  return {
    name,
    email,
    phone,
    visibility,
    amount,
  }
}

export default Page
