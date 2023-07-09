import Link from 'next/link'
import { marked } from 'marked'

type TOCProps = {
  content: string
} 
const TableOfContents = ({ content }: TOCProps): JSX.Element => {
  const tokens = marked.lexer(content)
  const headings = tokens.filter((token, i) => token.type === 'heading')
  return (
    <aside className='fixed top-50 left-20'>
      <nav>
        <ul>
          {headings.map((heading, i) => (
            <li key={i} data-depth={heading.depth} className={`ml-${(heading.depth - 1) * 4}`}>
              <Link
                href={`#${heading.text
                  .replace(/ /g, '-')
                  .replace(/[\/\\^$*+?.()|\[\]{}<>:;"'~,=@`#!%&]/g, '')
                  .toLowerCase()}`}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default TableOfContents