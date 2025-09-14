export interface User {
    readonly id: number
    name: string
    username: string
    email: string
}

export interface Post {
    readonly id: number
    title: string
    body: string
}

export interface UserWithPosts extends User {
    posts: Post[]
}
