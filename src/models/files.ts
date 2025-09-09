export type Folder = {
  id: string
  name: string
  mimeType: string
  parents: string[]
  contents: Array<Folder | File>
}

export type File = {
  id: string
  name: string
  mimeType: string
  parents: string[]
}
