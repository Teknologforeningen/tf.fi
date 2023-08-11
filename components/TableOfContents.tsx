import Link from 'next/link'
import { ContentSection } from '@models/contentpage'
import { titleToAnchor } from '@utils/helpers'

const TableOfContents = ({ sections }: { sections: ContentSection[] }) => {
  return (
    <div>
      <ul>
        {sections.map((section, i) => (
          <li key={i} className="">
            <Link href={`#${titleToAnchor(section.attributes.title)}`}>
              {section.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableOfContents
