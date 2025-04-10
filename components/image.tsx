import React, { FC } from "react"
import Frame from "./frame"
import styles from "./image.module.css"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image: FC<ImageProps> = ({ caption, image }) => {
  const paddingIfCaption = caption && styles.padding
  const classes = [styles.container, paddingIfCaption].join(" ")
  return (
    <div className={classes}>
      <Frame>
        <img
          src={image.fixed.src}
          className={styles.img}
        />
      </Frame>
      {caption && <h2>{caption}</h2>}
    </div>
  )
}

export interface ImageProps {
  caption?: string
  image: {
    fixed: {
      height: number
      src: string
      width: number
    }
  }
}

export default Image
