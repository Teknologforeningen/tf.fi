import React from "react"
import styles from "./video.module.css"

const Video: React.FC<VideoProps> = ({ video }) => {
  return (
    <div className={styles.container}>
      <video
        controls={true}
        className={styles.video}
        autoPlay={true}
        muted={true}
      >
        <source src={video.file.url} type="video/mp4" />
      </video>
    </div>
  )
}

export interface VideoProps {
  video: {
    file: {
      url: string
    }
  }
}

export default Video
