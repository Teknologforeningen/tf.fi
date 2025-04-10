import React from "react"
import styles from "./frame.module.css"

const Frame: React.FC<FrameProps> = ({ children }) => {
  return (
    <div className={styles.frame}>
      <div className={styles.frameBottomLeft}></div>
      <div className={styles.frameUpperRight}></div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

interface FrameProps {
  children: React.ReactNode
}

export default Frame
