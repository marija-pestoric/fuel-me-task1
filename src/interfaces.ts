interface Geo {
    lat: string
    lon: string
}
interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

interface Company {
    name: string
    cathPhrase: string
    bs: string
}

export interface User {
    readonly id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}

export interface Post {
    readonly id: number
    userId: number
    title: string
    body: string
}

export interface UserWithPosts extends User {
    posts: Post[]
}
