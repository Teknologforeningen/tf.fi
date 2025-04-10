import React, { useEffect, useMemo, useState } from "react"
import { DonateProps, Donation } from "./donate"
import DonationSummary from "./donationsummary"
import GroupAssociator from "./groupassociator"
import styles from "./confirmation.module.css"
import { MINIMUM_SUM_FOR_ADDRESS } from "./donationlevel"
import AddressForm from "./addressform"

const Confirmation: React.FC<{
  donation: Donation | null
  labels: DonateProps
  transactionSlug: string
}> = ({ donation, labels, transactionSlug }) => {
  if (donation == null) {
    return (
      <p>Hämtar donationsuppgifter...</p>
    )
  }

  const donationSum = parseFloat(donation.sum)

  const totalSumTarget = Math.round(donation.totalSum)
  const totalSum = useCounter(totalSumTarget, 2000, 0)
  const concreteAmountTarget = donationSum / 180
  const concreteAmount = useCounter(concreteAmountTarget, 2000, 2000)
  const danceFloorTarget = 10000 * (donationSum / 4815)
  const danceFloor = useCounter(danceFloorTarget, 2000, 4000)
  const percentageOfTotalTarget = 100 * donationSum / 4800000
  const percentageOfTotal = useCounter(percentageOfTotalTarget, 2000, 6000)

  return (
    <div>
      <h2>{labels.bekraftelseTack}</h2>
      <p>{labels.bekraftelseTackUtforlig}</p>
      <p className={styles.stats}>
        Du har nu bidragit till en total pott på <span>{Math.round(totalSum).toString().padStart(totalSumTarget.toString().length, "0")} €</span> för den pågående kampanjen.
        Vi rör oss ständigt mot målet på 4,0 M€.
        Ditt stöd motsvarar cirka <span>{(Math.round(concreteAmount * 100) / 100).toString().padEnd(5, "0")} m³</span> betong,{" "}
        <span>{Math.round(danceFloor).toString().padStart(3, "0")} cm²</span> dansgolv eller{" "}
        <span>{(Math.round(percentageOfTotal * 100000) / 100000).toString().padEnd(7, "0")} %</span> av TF:s nya nationshus.
        En bit i taget bygger vi Teknologföreningens framtid tillsammans!
      </p>
      {donationSum > MINIMUM_SUM_FOR_ADDRESS && (
        <>
          <p>{labels.bekraftelseAdress}</p>
          <fieldset>
            <legend><span>Adress</span></legend>
            <AddressForm
              initialAddress={donation.address}
              transactionSlug={transactionSlug}
            />
          </fieldset>
        </>
      )}
      <p>{labels.bekraftelseGruppdonation}</p>
      <fieldset>
        <legend><span>Gruppdonation (valfri)</span></legend>
        <GroupAssociator transactionSlug={transactionSlug} />
      </fieldset>
      <p>{labels.bekraftelseDonationsuppgifter}</p>
      <fieldset>
        <legend><span>Donationsuppgifter</span></legend>
        <DonationSummary donation={donation} labels={labels} />
      </fieldset>
    </div>
  )
}

const useCounter = (target: number, durationMillis: number, delayMillis: number) => {
  const [current, setCurrent] = useState<number>(0)
  let start = 0
  let startTime = 0
  let timer: number | null = 0

  useEffect(() => {
    start = current
    startTime = Date.now() + delayMillis

    const incrementer = () => {
      const currentTime = Date.now()
      if ((currentTime - startTime) >= durationMillis) {
        setCurrent(target)
        if (timer != null) {
          window.clearInterval(timer)
          timer = null
        }
      } else if (currentTime > startTime) {
        const deltaY = target - start
        const px = (currentTime - startTime) / durationMillis
        setCurrent(start + px * deltaY)
      }
    }

    timer = window.setInterval(incrementer, 1000 / 10)

    return () => {
      if (timer != null) {
        window.clearInterval(timer)
      }
    }
  }, [target])

  return current
}

export default Confirmation
