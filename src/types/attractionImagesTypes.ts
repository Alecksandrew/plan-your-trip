export type photosName = {
    name: string;
}

export type photos = {
    photos: photosName[]
}

export type imagesNameAPIResponse = {
    places: photos[]
}

export type imagesNamesBackendResponse = {
    data: imagesNameAPIResponse
}