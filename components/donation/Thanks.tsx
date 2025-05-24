import type { Contribution } from '@lib/barsborsen/payment'
import AddressForm, { Address } from '@components/donation/AddressForm'

const MINIMUM_SUM_FOR_ADDRESS = 279.38

const Thanks = ({
  transactionId,
  contribution,
  sum,
}: {
  transactionId: string
  contribution: Contribution
  sum: string
}) => {
  if (!contribution.sum) return null

  const donation = parseFloat(contribution.sum)
  if (isNaN(donation)) return null

  const totalSumTarget = Math.round(parseFloat(sum))
  const totalDonationSum = Math.round(totalSumTarget).toString().padStart(totalSumTarget.toString().length, '0')

  const concreteAmount = donation / 180
  const concretePadded = (Math.round(concreteAmount * 100) / 100).toString().padEnd(5, '0')

  const danceFloorAmount = (10000 * donation) / 4815
  const danceFloorPadded = Math.round(danceFloorAmount).toString().padStart(3, '0')

  const percentageOfTotal = (100 * donation) / 4800000
  const percentagePadded = (Math.round(percentageOfTotal * 100000) / 100000).toString().padEnd(7, '0')

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
        Vi vill varmt tacka för att du är med och förverkligar Träffpunkt Aalto – ett nytt nationshus med Otnäs bästa
        läge. Ditt stöd är ovärderligt för genomförandet av nästa och största steget i Teknologföreningens historia.
      </p>
      <p>
        Du har nu bidragit till en total pott på {totalDonationSum} € för den pågående kampanjen. Vi rör oss ständigt
        mot målet på 4,0 M€. Ditt stöd motsvarar cirka {concretePadded} m³ betong, {danceFloorPadded} cm² dansgolv eller{' '}
        {percentagePadded} % av TF:s nya nationshus. En bit i taget bygger vi Teknologföreningens framtid tillsammans!
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
