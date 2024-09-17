import { marked } from 'marked'

export const getDateLong = (date: Date | string): string =>
  new Date(date).toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const getDateShort = (date: Date | string): string =>
  new Date(date).toLocaleDateString('fi-FI', {
    dateStyle: 'short',
  })

export const titleToAnchor = (title: string) => {
  return title
    .trim()
    .replace(/ /g, '-')
    .replace(/[\/\\^$*+?.()|\[\]{}<>:;"'~,=@`#!%&]/g, '')
    .toLowerCase()
}

//only way I found to remove (almost) all br tags and iframes from markdown
class TextSnippetRenderer extends marked.Renderer {
  html(html: string) {
    // Remove iframes
    if (html.includes('<iframe')) {
      return ' '
    }
    return html.replace(/(<br\s*\/?>)+/gi, ' ')
  }
}

export const processMarkdownSnippet = (markdown: string) => {
  const renderer = new TextSnippetRenderer()

  renderer.image = () => ' '
  renderer.heading = () => ' '
  renderer.br = () => ' '
  renderer.paragraph = (text) => ` ${text.trim()} `
  renderer.list = () => ' '
  renderer.table = () => ' '
  renderer.link = (href, title, text) => text
  return marked(markdown, { renderer })
}
