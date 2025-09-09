import React from 'react'
import { marked } from 'marked'
import { titleToAnchor } from '@utils/helpers'
import { FileFolder } from '@models/page'
import DriveExplorer from './drive/DriveExplorer'

type PageSectionProps = {
  title?: string
  content?: string
  fileFolders: FileFolder[]
  isPrivate: boolean
}

const PageSection = ({ title, content, fileFolders, isPrivate }: PageSectionProps) => (
  <div>
    {title && (
      <h2 id={titleToAnchor(title)} className="scroll-mt-24">
        {title}
      </h2>
    )}
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(content ?? ''),
      }}
    />
    {fileFolders.map(({ title, description, folderId }) => (
      <div key={title}>
        <h3>{title}</h3>
        <p>{description}</p>
        <DriveExplorer folderId={folderId} isPrivate={isPrivate} />
      </div>
    ))}
  </div>
)

export default PageSection
