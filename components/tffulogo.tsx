import { motion } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const TFFU: React.FC<{
  variant?: "default" | "white"
}> = ({ variant }) => {
  const imageVariants = useStaticQuery(graphql`
    query {
      default: file(relativePath: { eq: "tffu/tffu.svg" }) {
        publicURL
      }
      white: file(relativePath: { eq: "tffu/tffu-white.svg" }) {
        publicURL
      }
    }
  `)
  const image = variant == "white" ? imageVariants.white : imageVariants.default

  return (
    <motion.img
      whileHover={{ scale: 1.1 }}
      style={{ margin: 0 }}
      src={image.publicURL}
      alt="TF Fundraising-logotyp"
    />
  )
}

export default TFFU
