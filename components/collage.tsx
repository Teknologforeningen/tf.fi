import React, { FC } from "react"
import { StaticImage } from "gatsby-plugin-image"

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

const Collage: FC = () => {
  return (
    <>
      <StaticImage
        src="../images/studerandecentret.jpg"
        style={{ height: "100%" }}
        imgStyle={{ objectFit: "cover" }}
        alt="Illustrationsbild för Vision TF"
        loading="eager"
        placeholder="tracedSVG"
      />
      <StaticImage
        src="../images/map-overlay.png"
        style={{ position: "absolute", top: 0, left: 0, height: "100%" }}
        imgStyle={{ objectFit: "cover" }}
        alt="Illustrationsbild för Vision TF"
        loading="eager"
        placeholder="tracedSVG"
      />
    </>
  )
}

export default Collage
