/* eslint-disable @typescript-eslint/no-explicit-any */
import { drive_v3 } from 'googleapis'
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

export const debounce = (
  func: (...args: any[]) => any,
  delay: number,
  debounceTimeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
) => {
  return function (args: any[]) {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(() => {
      func(...args)
      debounceTimeout.current = null
    }, delay)
  }
}

export const buildFolderPaths = (folders: drive_v3.Schema$File[]) => {
  // Step 1: Create a map of folderId to folder object for quick lookup
  const folderMap = new Map<string, drive_v3.Schema$File>()
  for (const folder of folders ?? []) {
    folder.id && folderMap.set(folder.id, folder)
  }

  // Step 2: Initialize a path cache
  const pathMap = new Map<string, string>()

  // Step 3: Define a recursive function with memoization
  function getFullPath(
    folderId: string,
    visited: Set<string> = new Set()
  ): string {
    // Check if the path is already computed
    if (pathMap.has(folderId)) {
      return pathMap.get(folderId)!
    }

    // Detect cycles
    if (visited.has(folderId)) {
      // Cycle detected, return the folder's name to avoid infinite recursion
      const folder = folderMap.get(folderId)
      return folder ? '/' + folder.name : ''
    }
    visited.add(folderId)

    // Retrieve the folder
    const folder = folderMap.get(folderId)
    if (!folder) {
      // Folder not found, return empty path or handle as needed
      return ''
    }

    let fullPath: string
    if (!folder.parents || folder.parents.length === 0) {
      // Root folder
      fullPath = '/' + folder.name
    } else {
      // Recursive call to get parent's full path
      const parentPath = getFullPath(folder.parents[0], visited)
      fullPath = parentPath + '/' + folder.name
    }

    // Step 4: Cache the computed full path
    pathMap.set(folderId, fullPath)
    visited.delete(folderId)
    return fullPath
  }

  // Step 5: Iterate over all folders to compute full paths
  for (const folder of folders ?? []) {
    folder.id && getFullPath(folder.id)
  }

  // Step 6: Return the map of folderId to full path string
  return pathMap
}
