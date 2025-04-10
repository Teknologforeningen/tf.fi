import React from "react"
import { Link } from "gatsby"
import styles from "./grid.module.css"
import Card from "./card"

const Grid: React.FC<GridProps> = ({ title, gridItems }) => {
  const cardLinks = gridItems.map(gridItem => (
    <CardLink key={gridItem.id} gridItem={gridItem} />
  ))
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.grid}>{cardLinks}</div>
    </section>
  )
}

export interface GridProps {
  title: string
  gridItems: GridItem[]
}

interface GridItem {
  id: string
  title: string
  backgroundImage: {
    file: {
      url: string
    }
  }
  page: {
    slug: string
  }
}

const CardLink: React.FC<{
  gridItem: GridItem
}> = ({ gridItem }) => {
  const { slug } = gridItem.page
  const path =
    slug === "index"
      ? "/"
      : slug
          .toLowerCase()
          .replace(/(ä|å)/g, "a")
          .replace(/ö/g, "o")
          .replace(/\s/g, "-")
          .replace(/([^a-z|-])/g, "")
  return (
    <Link to={`/${path}`} className={styles.link}>
      <Card>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{gridItem.title}</h2>
        </div>
      </Card>
    </Link>
  )
}

export default Grid
