import { motion } from "framer-motion"
import React from "react"
import { DonateProps, Donation } from "./donate"
import styles from "./donationsummary.module.css"

const DonationSummary: React.FC<{
    donation: Donation,
    labels: DonateProps
}> = ({ donation, labels }) => (
  <motion.div className={styles.container}>
    <p>{labels.faltNamn}: <span>{donation.name}</span></p>
    <p>
      {labels.faltSynlighet}:{" "}
      <span>
      {donation.visibility === "pseudonym" ? (
        donation.pseudonym
      ) : (
        donation.visibility === "visible" ?
        "Synlig" : "Anonym"
      )}
      </span>
    </p>
    <p>{labels.faltEpost}: <span>{donation.email}</span></p>
    <p>{labels.faltSumma}: <span>{donation.sum} €</span></p>
  </motion.div>
)

export default DonationSummary
