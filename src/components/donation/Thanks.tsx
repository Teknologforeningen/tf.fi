import type { Contribution } from '@lib/barsborsen/payment'
import AddressForm, { Address } from '@components/donation/AddressForm'

const MINIMUM_SUM_FOR_ADDRESS = 279.38

const Thanks = ({ transactionId, contribution }: { transactionId: string; contribution: Contribution }) => {
  if (!contribution.sum) return null

  const donation = parseFloat(contribution.sum)
  if (isNaN(donation)) return null

  const street = contribution.donor?.address
  const zipCode = contribution.donor?.zip_code
  const city = contribution.donor?.city
  const country = contribution.donor?.country
  const address: Address | undefined =
    street && zipCode && city && country ? { street, zipCode, city, country } : undefined

  return (
    <section>
      <h2>Tack för ditt bidrag!</h2>
      <p>
        Vi vill varmt tacka för att du är med och förverkligar renoveringen av Urdsgjallar – ett förnyat nationshus med
        Otnäs bästa läge, detta gynnar nationen stort. Ditt stöd är ovärderligt för genomförandet av nästa och största
        steget i Teknologföreningens historia. En bit i taget bygger vi Teknologföreningens framtid tillsammans!
      </p>
      {donation > MINIMUM_SUM_FOR_ADDRESS && <AddressForm transactionId={transactionId} address={address} />}
      <p>
        Ifall du valde att din donation får vara synlig kommer ditt namn eller din pseudonym nu att synas bland de som
        är med och förverkligar Träffpunkt Aalto. Du kan även associera donationen med en grupp av andra donatorer i
        formuläret nedan.
      </p>
    </section>
  )
}

export default Thanks
