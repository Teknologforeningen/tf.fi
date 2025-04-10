import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const TFLogo: React.FC<{
  variant?: "default" | "white"
}> = ({ variant }) => {
  const logoVariants: {
    default: File,
    white: File
  } = useStaticQuery(graphql`
    query {
      default: file(relativePath: { eq: "tf.svg" }) {
        publicURL
      }
      white: file(relativePath: { eq: "tf-white.svg" }) {
        publicURL
      }
    }
  `)
  const logo = variant == "white" ? logoVariants.white : logoVariants.default

  return (
    <img
      style={{ margin: 0 }}
      src={logo.publicURL}
      alt="Teknologföreningens logotyp"
    />
  )
}

interface File {
  publicURL: string
}

export default TFLogo
