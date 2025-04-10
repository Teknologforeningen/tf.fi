import { AnimatePresence, motion } from "framer-motion"
import React, { useContext, useEffect, useMemo, useState } from "react"
import DonationForm from "./donationform"
import DonationSummary from "./donationsummary"
import PaymentMethod from "./paymentmethod"
import styles from "./donate.module.css"
import { LocationContext } from "../../templates/page"
import axios from "axios"
import Confirmation from "./confirmation"
import DonationLevel, { DonationLevels } from "./donationlevel"
import { Address } from "./addressform"

const Donate: React.FC<{
  labels: DonateProps
}> = ({ labels }) => {
  const isPaymentOk = useIsPaymentOk()
  const transactionSlug = useTransactionSlug()
  const [isLoadingDonation, donation, setDonation] = useDonation(transactionSlug)
  const [isEditingDonation, setIsEditingDonation] = useState(
    !isLoadingDonation
  )

  return (
    <div className={styles.container}>
      {(isPaymentOk && transactionSlug != null) ? (
        <Confirmation donation={donation} labels={labels} transactionSlug={transactionSlug} />
      ) : (
        <>
          {transactionSlug != null && donation != null && (
            <fieldset className={styles.error}>
              <p>Betalningen misslyckades. Var vänlig och dubbelkolla dina uppgifter, försök sedan på nytt.</p>
            </fieldset>
          )}
          <motion.fieldset>
            <legend>
              <span>{labels.sektionDonationsuppgifter}</span>
              <AnimatePresence>
                {!isEditingDonation &&
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsEditingDonation(true)}
                    layout
                  >
                    Ändra
                  </motion.button>
                }
              </AnimatePresence>
            </legend>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
              {isLoadingDonation ? (
                <p>Hämtar...</p>
              ) : (
                (donation == null || isEditingDonation) ? (
                  <motion.div
                    key="donation-form"
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={transitionVariants}
                    transition={{ ease: "easeInOut" }}
                  >
                    <DonationForm
                      donation={donation}
                      labels={labels}
                      onFormFilled={(donation) => {
                        setDonation(donation)
                        setIsEditingDonation(false)
                      }}
                      donationLevels={{
                        donationsniva0: labels.donationsniva0,
                        donationsniva1: labels.donationsniva1,
                        donationsniva2: labels.donationsniva2,
                        donationsniva3: labels.donationsniva3,
                        donationsniva4: labels.donationsniva4,
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="donation-summary"
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={transitionVariants}
                    transition={{ ease: "easeInOut" }}
                  >
                    <DonationSummary
                      donation={donation}
                      labels={labels}
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.fieldset>
          {donation != null && !isEditingDonation &&
            <motion.fieldset
              key="payment-method"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={transitionVariants}
              transition={{ ease: "easeInOut" }}
            >
              <legend><span>{labels.sektionValjBetalningsmetod}</span></legend>
              <PaymentMethod donation={donation} labels={labels} />
            </motion.fieldset>
          }
        </>
      )}
    </div>
  )
}

const transitionVariants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: { opacity: 1, height: "auto" }
}

export type CheckoutHeaders = Record<CheckoutHeaderNames, string>

interface Transaction {
  "checkout-transaction-id": string
  status: "new" | "ok" | "fail" | "pending" | "delayed"
  contribution: {
    visibility: VisibilityChoice,
    sum: string
    greeting: string
    group_name: string
    donor: {
      name: string
      pseudonym: string
      email: string
      address: string
      zip_code: string
      city: string
      country: string
    }
  }
}

interface Sum {
  total_sum: number
}

export interface Donation {
  visibility: VisibilityChoice
  pseudonym: string
  sum: string
  name: string
  email: string
  totalSum: number
  address: Address
}

export type VisibilityChoice = "visible" | "anonymous" | "pseudonym"

const checkoutHeaderNames = [
  "checkout-account",
  "checkout-algorithm",
  "checkout-amount",
  "checkout-stamp",
  "checkout-reference",
  "checkout-transaction-id",
  "checkout-status",
  "signature"
] as const
type CheckoutHeaderNames = typeof checkoutHeaderNames[number]

const useTransactionSlug = () => {
  const location = useContext(LocationContext)
  if (location == null) {
    return null
  }
  const potentialParameters = new URLSearchParams(location.search)
  return potentialParameters.get("checkout-transaction-id")
}

const useIsPaymentOk = () => {
  const location = useContext(LocationContext)
  if (location == null) {
    return false
  }
  const potentialParameters = new URLSearchParams(location.search)
  return potentialParameters.get("betalning") === "ok"
}

const useDonation = (transactionId: string | null): [
  boolean, Donation | null, React.Dispatch<React.SetStateAction<Donation | null>>
] => {
  const [isLoading, setIsLoading] = useState(
    transactionId !== null
  )
  const [donation, setDonation] = useState<Donation | null>(null)

  useEffect(() => {
    if (transactionId == null) {
      return
    }

    const fetchAndSetTransaction = async () => {
      const encodedTransactionId = encodeURI(transactionId)
      try {
        const transactionAndTotalSum = Promise.all([
          axios.get<Transaction>(
            `${process.env.GATSBY_DONATIONDB_URL}/payments/transaction/${encodedTransactionId}`
          ),
          axios.get<Sum>(`${process.env.GATSBY_DONATIONDB_URL}/donations/sum`)
        ])
        const [transactionResponse, totalSumResponse] = await transactionAndTotalSum
        const transaction = transactionResponse.data
        const totalSum = totalSumResponse.data
        console.log(transaction)
        setDonation({
          email: transaction.contribution.donor.email,
          name: transaction.contribution.donor.name,
          pseudonym: transaction.contribution.donor.pseudonym,
          sum: transaction.contribution.sum,
          visibility: transaction.contribution.visibility,
          totalSum: totalSum.total_sum,
          address: {
            street: transaction.contribution.donor.address,
            zipCode: transaction.contribution.donor.zip_code,
            city: transaction.contribution.donor.city,
            country: transaction.contribution.donor.country
          }
        })
        setIsLoading(false)
      } catch(error) {
          console.error("Unable to fetch transaction", error)
          setDonation(null)
          setIsLoading(false)
      }
    }
    fetchAndSetTransaction()
  }, [])

  return [isLoading, donation, setDonation]
}

export interface DonateProps {
  bekraftelseTackUtforlig: string
  bekraftelseTack: string
  bekraftelseAdress: string
  bekraftelseGruppdonation: string
  bekraftelseDonationsuppgifter: string
  childContentfulDonationFormAlternativaDonationerTextNode: {
    childMarkdownRemark: {
      html: string
    }
  }
  childrenContentfulDonationFormLitenTextISlutetTextNode: {
    childrenMarkdownRemark: {
      html: string
    }[]
  }[]
  donationsniva0: string
  donationsniva1: string
  donationsniva2: string
  donationsniva3: string
  donationsniva4: string
  faltEpost: string
  faltNamn: string
  faltSumma: string
  faltSynlighet: string
  sektionDonationsuppgifter: string
  sektionValjBetalningsmetod: string
  synlighetAnonym: string
  synlighetForklaring: string
  synlighetPseudonym: string
  synlighetSynlig: string
}

export default Donate
