import React from "react"
import Frame from "./frame"
import styles from "./multiquote.module.css"

const MultiQuote: React.FC<MultiQuoteProps> = ({ id, name, quotes }) => {
  const quoteElements = quotes.map(quote => (
    <Quote
      key={quote.author}
      author={quote.author}
      authorImage={quote.authorImage}
      title={quote.title}
    />
  ))
  return <section className={styles.container}>{quoteElements}</section>
}

const Quote: React.FC<Quote> = ({ author, authorImage, title }) => (
  <blockquote className={styles.quote}>
    <img
      className={styles.authorImage}
      src={authorImage.fixed.src}
      alt={`Bild på teknolog ${author}`}
    />
    <p className={styles.quoteText}>{title}</p>
    <footer className={styles.author}>{author}</footer>
  </blockquote>
)

export interface MultiQuoteProps {
  id: string
  name: string
  quotes: Quote[]
}

interface Quote {
  author: string
  authorImage: {
    id: string
    fixed: {
      src: string
    }
  }
  title: string
}

export default MultiQuote
