import axios from "axios"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { DonateProps, Donation } from "./donate"
import styles from "./paymentmethod.module.css"

const PaymentMethod: React.FC<{
  donation: Donation
  labels: DonateProps
}> = ({ donation, labels }) => {
  const [payment, setPayment] = useState<Payment | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const updatePaymentProviders = async () => {
      setPayment(null)
      try {
        const response = await axios.post<Payment>(`${process.env.GATSBY_DONATIONDB_URL}/payments/providers`, donation)
        const paymentResponse = response.data
        setPayment(paymentResponse)
      } catch (error) {
        setFetchError(
          "Ett okänt fel inträffade och betalningsmetoderna kunde inte hämtas. " +
          "Var vänlig att dubbelkolla donationsuppgifterna. " +
          "Om det inte hjälper, kontakta oss på <a href=\"mailto:funchef@tf.fi\">funchef@tf.fi</a>"
        )
      }
    }

    updatePaymentProviders().catch(console.error)
  }, [donation])

  return (
    <div className={styles.container}>
      {fetchError && <p dangerouslySetInnerHTML={{ __html: fetchError }} />}
      {payment?.groups.map(group => (
        <PaymentGroup
          key={group.id}
          name={group.name}
          providers={
            payment.providers.filter(provider => provider.group == group.id)
          }
        />
      ))}
      {payment && (
        <p><small dangerouslySetInnerHTML={{ __html: payment.terms}}></small></p>
      )}
      <small
        dangerouslySetInnerHTML={{
          __html: labels.childContentfulDonationFormAlternativaDonationerTextNode.childMarkdownRemark.html
        }}
      />
    </div>
  )
}

const PaymentGroup: React.FC<{
  name: string
  providers: PaymentProvider[]
}> = ({ name, providers }) => (
  <div>
    <h3>{name}</h3>
    <div className={styles.grid}>
    {providers.map(provider => (
        <form
          className={styles.form}
          key={provider.name}
          action={provider.url}
          method="POST"
        >
          {provider.parameters.map(parameter =>
            <input
              type="hidden"
              name={parameter.name}
              value={parameter.value}
            />
          )}
          <motion.button whileHover={{ scale: 1.1 }}>
            <img src={provider.svg} />
          </motion.button>
        </form>
      ))
    }
    </div>
  </div>
)

interface Payment {
  groups: PaymentGroup[]
  href: string
  providers: PaymentProvider[]
  reference: string
  terms: string
  transactionId: string
}

interface PaymentGroup {
    icon: string
    id: string
    name: string
    svg: string
}

interface PaymentProvider {
    group: string
    icon: string
    id: string
    name: string
    svg: string
    url: string
    parameters: {
      name: string
      value: string
    }[]
}

export default PaymentMethod
