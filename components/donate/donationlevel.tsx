import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import styles from "./donationlevel.module.css"

const DonationLevel: React.FC<{
  donationLevels: DonationLevels
  onLevelChange: (sum: number) => void
  sum: number
}> = ({ donationLevels, onLevelChange, sum }) => {
  const textForSum = (sum: number) =>
    sum >= 10000 ? donationLevels.donationsniva4 :
    sum >= 5000 ? donationLevels.donationsniva3 :
    sum >= 1000 ? donationLevels.donationsniva2 :
    donationLevels.donationsniva0

  const description = textForSum(sum)

  return (
    <motion.div className={styles.donationlevel} layout>
      <div className={styles.levels}>
        <span className={classNames({ [styles.active]: sum > 0 })}></span>
        <motion.button
          className={classNames({ [styles.active]: sum >= 1000 })}
          whileHover={{ scale: 1.1 }}
          onClick={() => onLevelChange(1000)}
        >
          1k
        </motion.button>
        <span className={classNames({ [styles.active]: sum > 1000 })}></span>
        <motion.button
          className={classNames({ [styles.active]: sum >= 5000 })}
          whileHover={{ scale: 1.1 }}
          onClick={() => onLevelChange(5000)}
        >
          5k
        </motion.button>
        <span className={classNames({ [styles.active]: sum > 5000 })}></span>
        <motion.button
          className={classNames({ [styles.active]: sum >= 10000 })}
          whileHover={{ scale: 1.1 }}
          onClick={() => onLevelChange(10000)}
        >
          10k
        </motion.button>
        <span className={classNames({ [styles.active]: sum > 10000 })}></span>
      </div>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        <motion.p
          key={description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {textForSum(sum)}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

export const MINIMUM_SUM_FOR_ADDRESS = 253.69

export interface DonationLevels {
  donationsniva0: string
  donationsniva1: string
  donationsniva2: string
  donationsniva3: string
  donationsniva4: string
}

export default DonationLevel
