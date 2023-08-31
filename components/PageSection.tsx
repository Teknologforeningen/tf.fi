import React from 'react'
import { marked } from 'marked'
import { titleToAnchor } from '@utils/helpers'
import { FileFolder } from '@models/page'
import DriveExplorer from './FileExplorer'

type PageSectionProps = {
  title: string
  content?: string
  file_folders: FileFolder[]
  isPrivate: boolean
}

const PageSection = ({
  title,
  content,
  file_folders,
  isPrivate,
}: PageSectionProps) => (
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
        <DriveExplorer folderId={attributes.folderId} isPrivate={isPrivate} />
      </div>
    ))}
  </div>
)

export default PageSection
