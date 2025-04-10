import React, { FC } from "react"

export interface MarkdownRemarkProps {
  childContentfulSectionBodyTextNode: MarkdownRemarkTextNode
}

export interface MarkdownRemarkTextNode {
  childMarkdownRemark: {
    html: string
  }
}

const MarkdownRemark: FC<MarkdownRemarkTextNode> = ({
  childMarkdownRemark,
}) => (
  <div
    style={{ color: "#111" }}
    dangerouslySetInnerHTML={{
      __html: childMarkdownRemark.html,
    }}
  />
)

export default MarkdownRemark
