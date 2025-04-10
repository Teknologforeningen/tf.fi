import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

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

const Map: FC = () => {
  const data = useStaticQuery(
    graphql`{
      file(relativePath: {eq: "map.png"}) {
        childImageSharp {
          gatsbyImageData(width: 768, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
    `
  )

  return (
    <GatsbyImage
      image={data.file.childImageSharp.gatsbyImageData}
      style={{
        margin: "64px 0",
      }} />
  );
}

export default Map
