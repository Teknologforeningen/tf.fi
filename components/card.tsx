import React from "react"
import styles from "./card.module.css"

const Card: React.FC<CardProps> = ({ children }) => (
  <div className={styles.card}>
    <div className={styles.cardBackground}></div>
    <div className={styles.cardFrontCard}>{children}</div>
  </div>
)

interface CardProps {
  children: React.ReactNode
}

export default Card
