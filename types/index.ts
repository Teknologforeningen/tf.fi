export interface Post {
    id: number
    Title?: string
    Slug?: string
    Content?: string
    User?: User
    published_at?: string
    created_at?: string
    updated_at?: string
}

interface User {
    id: number
    username: string
    email: string
    provider?: string
    confirmed?: boolean
    blocked?: boolean
    role?: number
    created_at?: string
    updated_at?: string
}
