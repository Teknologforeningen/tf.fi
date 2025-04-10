import React from "react"
import Collage from "./collage"
import styles from "./cover.module.css"
import Slogan, { SloganProps } from "./slogan"

export interface CoverProps {
  slogan: SloganProps
}

export const Cover: React.FC<CoverProps> = ({ slogan }) => {
  return (
    <section className={styles.cover}>
      <div className={styles.image}>
        <Collage />
      </div>
      <Slogan
        leadingText={slogan.leadingText}
        boldedText={slogan.boldedText}
        trailingText={slogan.trailingText}
      />
    </section>
  )
}
