import React from "react"
import styles from "./slogan.module.css"

const Slogan: React.FC<SloganProps> = ({
  leadingText,
  boldedText,
  trailingText,
  color = "dark-gray",
  extendedHeight = false,
  noMargin = false,
}) => {
  const noMarginClass = noMargin && styles.noMargin
  const backgroundClass =
    color === "dark-gray"
      ? styles.containerDarkGray
      : styles.containerKoppargron
  const containerClasses = [styles.container, backgroundClass, noMarginClass]
    .filter(className => className != undefined)
    .join(" ")

  const paddingIfOnlyBoldedText =
    (!(leadingText && trailingText) && styles.sloganLargePadding) || ""
  const extendedHeightClass = (extendedHeight && styles.extendedHeight) || ""
  const sloganClasses = [
    styles.slogan,
    paddingIfOnlyBoldedText,
    extendedHeightClass,
  ].join(" ")

  const noMarginIfNoTrailingText = !trailingText ? styles.noMargin : ""
  return (
    <div className={containerClasses}>
      <div className={sloganClasses}>
        {leadingText && <p>{leadingText}</p>}
        {leadingText && trailingText ? (
          <h1 className={noMarginIfNoTrailingText}>{boldedText}</h1>
        ) : (
          <h2 className={noMarginIfNoTrailingText}>{boldedText}</h2>
        )}
        {trailingText && (
          <p className={styles.noMargin}>{trailingText.trailingText}</p>
        )}
      </div>
    </div>
  )
}

export interface SloganProps {
  boldedText: string
  leadingText?: string
  trailingText?: {
    trailingText: string
  }
  color?: "dark-gray" | "koppargron"
  extendedHeight?: boolean
  noMargin?: boolean
}

export default Slogan
