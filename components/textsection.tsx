import React from "react"
import MarkdownRemark, { MarkdownRemarkProps } from "./markdownremark"
import styles from "./textsection.module.css"

const TextSection: React.FC<{
  title: string
  node: MarkdownRemarkProps
}> = ({ title, node }) => (
  <section className={styles.section}>
    <h2>{title}</h2>
    <MarkdownRemark
      childMarkdownRemark={
        node.childContentfulSectionBodyTextNode.childMarkdownRemark
      }
    />
  </section>
)

export default TextSection
