import Link from 'next/link'
import { Section } from '@models/page'
import { titleToAnchor } from '@utils/helpers'

const TableOfContents = ({ sections }: { sections: Section[] }) => {
  return (
    <ul>
      {sections.map((section, i) => (
        <li key={i}>
          <Link
            className="no-underline hover:underline"
            href={`#${titleToAnchor(section.attributes.title)}`}
          >
            {section.attributes.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TableOfContents
