/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Meta {
  name: string
  content: any
  property?: undefined
}

interface SEOProps {
  description?: string
  meta?: Meta[]
  lang?: string
  title: string
}

const SEO: FC<SEOProps> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const skipPrefixOnIndex =
    title === "index"
      ? site.siteMetadata.title
      : `%s | ${site.siteMetadata.title}`

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={skipPrefixOnIndex}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link
        href={`https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,900;1,300;1,400;1,900&display=swap`}
        rel="stylesheet"
      />
      <script
        async
        src="https://vision-tf-fi-analytics.herokuapp.com/tracker.js"
        data-ackee-server="https://vision-tf-fi-analytics.herokuapp.com"
        data-ackee-domain-id="0f14d3cd-1208-48e1-af7c-4fe0d6640a80">
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
