import React, { FC } from "react"
import styles from "./quote.module.css"

export interface QuoteProps {
  author?: string
  title: string
  authorImage?: {
    id: string
    fixed: {
      src: string
    }
  }
  color?: "dark-gray" | "koppargron"
}

const Quote: FC<QuoteProps> = ({ author, title, authorImage, color }) => {
  const containerClasses = [
    color === "koppargron" ? styles.koppargron : styles.darkGray,
    styles.container,
  ].join(" ")
  const titleWords = title.split(" ")
  const firstWord = (
    <>
      <span>{titleWords[0]}</span>{" "}
    </>
  )
  const middleWords = titleWords.slice(1, titleWords.length - 1).join(" ")
  const lastWord = (
    <>
      {" "}
      <span>{titleWords[titleWords.length - 1]}</span>
    </>
  )

  return (
    <div className={containerClasses}>
      <blockquote className={styles.quote}>
        {authorImage && (
          <img src={authorImage.fixed.src} alt={`Bild på ${author}`}></img>
        )}
        <div className={styles.quoteTextAndAuthor}>
          <p className={styles.quoteText}>
            {firstWord}
            {middleWords}
            {lastWord}
          </p>
          {author && <footer className={styles.author}>{author}</footer>}
        </div>
      </blockquote>
    </div>
  )
}

export default Quote
