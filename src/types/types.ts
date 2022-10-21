export type PhotosType = {
    small: string | null
    large: string | null
}


export type UsersType = {
    id: string
    photos: PhotosType
    name: string
    followed: boolean
    status: string
}