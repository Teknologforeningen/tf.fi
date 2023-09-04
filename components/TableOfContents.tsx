import Link from 'next/link'
import { Section } from '@models/page'
import { titleToAnchor } from '@utils/helpers'

const TableOfContents = ({ sections }: { sections: Section[] }) => {
  return (
    <>
      <h2>Innehållsförteckning</h2>
      <table className="table-auto border-separate text-sm">
        <tbody>
          {sections.map((section, i) => (
            <tr key={i}>
              {section.attributes.title && (
                <Link
                  className="no-underline hover:underline"
                  href={`#${titleToAnchor(section.attributes.title)}`}
                >
                  {section.attributes.title}
                </Link>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TableOfContents
