type WishlistType = {
    person: string | undefined,
    id: string | null,
    name: string,
    url: string | null,
    description: string | null,
    price: string,
    imageSrc: string | null,
}

type UserType = {
    person: string,
    sessionToken: string,
    password: string,
    wishlist: [WishlistType],
    giftsTo: string
}

export {
    type UserType,
    type WishlistType
}