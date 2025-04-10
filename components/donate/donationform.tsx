import React, { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import styles from "./donationform.module.css"
import { AnimatePresence, motion } from "framer-motion"
import { DonateProps, Donation, VisibilityChoice } from "./donate"
import DonationLevel, { DonationLevels } from "./donationlevel"
import { Link } from "gatsby"

const DonationForm: React.FC<{
  donation: Donation | null,
  donationLevels: DonationLevels,
  labels: DonateProps,
  onFormFilled: (donation: Donation) => void
}> = ({ donation, donationLevels, labels, onFormFilled }) => {
  const [name, setName] = useState(donation?.name || "")
  const [email, setEmail] = useState(donation?.email || "")
  const [visibility, setVisibility] = useState<
    VisibilityChoice
  >(donation?.visibility || "visible")
  const [pseudonym, setPseudonym] = useState(donation?.pseudonym || "")
  const [sum, setSum] = useState<string | number>(donation?.sum || "")
  const [flash, setFlash] = useState("")

  const validateInput = () => (
    name != "" &&
    email != "" && (
      visibility == "pseudonym" ?
        pseudonym != "" :
        (visibility == "visible" || visibility == "anonymous")
    ) &&
    !isNaN(Number(sum))
  )
  useEffect(() => {
    setFlash("")
  }, [name, email, visibility, pseudonym, sum])

  return (
    <motion.div
      key="contact-details"
      className={styles.container}
      layout
    >
      <div className={styles.inputGroup}>
        <label htmlFor="donate-name">{labels.faltNamn}</label>
        <input
          type="text"
          id="donate-name"
          placeholder="Svakar Teknolog"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
          <label htmlFor="donate-email">{labels.faltEpost}</label>
          <input
            type="email"
            id="donate-email"
            placeholder="svakar@teknolog.fi"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
      </div>
      <div
        className={classNames(
          styles.inputGroup,
          styles.visibility
        )}
      >
        <label>{labels.faltSynlighet}</label>
        <p>{labels.synlighetForklaring}</p>
        <div>
          <input
            type="radio"
            name="visibility"
            id="visibility-visible"
            value="visible"
            onChange={(event) => setVisibility(event.target.value as VisibilityChoice)}
            checked={visibility == "visible"}
          />
          <label htmlFor="visibility-visible">
            {labels.synlighetSynlig}
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="visibility"
            value="pseudonym"
            id="visibility-pseudonym"
            onChange={(event) => setVisibility(event.target.value as VisibilityChoice)}
            checked={visibility == "pseudonym"}
          />
          <label htmlFor="visibility-pseudonym">
            {labels.synlighetPseudonym}
          </label>
          {visibility == "pseudonym" && (
            <input
              type="text"
              placeholder="Pseudonym"
              autoFocus={true}
              value={pseudonym}
              onChange={(event) => setPseudonym(event.target.value)}
            />
          )}
        </div>
        <div>
          <input
            type="radio"
            name="visibility"
            id="visibility-anonymous"
            value="anonymous"
            onChange={(event) => setVisibility(event.target.value as VisibilityChoice)}
            checked={visibility == "anonymous"}
          />
          <label htmlFor="visibility-anonymous">
            {labels.synlighetAnonym}
          </label>
        </div>
      </div>
      <motion.div className={styles.inputGroup}>
          <label htmlFor="donate-sum">{labels.faltSumma}</label>
          <input
            type="tel"
            id="donate-sum"
            placeholder="00.00"
            value={sum}
            onChange={(event) => setSum(event.target.value)}
          />
          <DonationLevel
            sum={Number(sum)}
            onLevelChange={setSum}
            donationLevels={donationLevels}
          />
      </motion.div>
      <AnimatePresence>
        {flash !== "" &&
          <motion.p
            className={styles.flash}
            key="flash"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0}
            }}
          >
            {flash}
          </motion.p>
        }
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          if (validateInput()) {
            onFormFilled({
              name,
              email,
              visibility,
              pseudonym,
              sum: sum.toString()
            })
          } else {
            setFlash("Var vänlig och fyll i alla fält för att fortsätta")
          }
        }}
      >
        {labels.sektionValjBetalningsmetod}
      </motion.button>
      {labels.childrenContentfulDonationFormLitenTextISlutetTextNode.flatMap(elements =>
        elements.childrenMarkdownRemark.map(element => (
          <small dangerouslySetInnerHTML={{
            __html: element.html
          }} />
        ))
      )}
    </motion.div>
  )
}

export default DonationForm
