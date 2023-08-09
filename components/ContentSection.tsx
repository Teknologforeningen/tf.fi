import React from 'react'
import { marked } from 'marked'
import { titleToAnchor } from '@utils/helpers'
import { FileFolder } from '@models/contentpage'
import DriveExplorer from './FileExplorer'

type ContentSectionProps = {
  title: string
  content?: string
  file_folders: FileFolder[]
}

const ContentSection = ({
  title,
  content,
  file_folders,
}: ContentSectionProps) => (
  <div>
    <h2 id={titleToAnchor(title)}>{title}</h2>
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(content ?? ''),
      }}
    />
    {file_folders.map(({ attributes }, i) => (
      <div key={i}>
        <h3>{attributes.title}</h3>
        <p>{attributes.description}</p>
        <DriveExplorer folderId={attributes.folderId} />
      </div>
    ))}
  </div>
)

export default ContentSection
