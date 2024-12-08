import Link from 'next/link'
import { Section } from '@models/page'
import { titleToAnchor } from '@utils/helpers'

const TableOfContents = ({ sections }: { sections: Section[] }) => {
  return (
    <>
      <h2>Innehållsförteckning</h2>
      {sections.map(
        (section) =>
          section.title && (
            <Link
              key={section.title}
              className="no-underline hover:underline"
              href={`#${titleToAnchor(section.title)}`}
            >
              {section.title}
            </Link>
          )
      )}
    </>
  )
}

export default TableOfContents
