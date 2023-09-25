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
