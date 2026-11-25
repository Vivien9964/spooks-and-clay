const CLOUDINARY_PREFIX = "https://res.cloudinary.com/"
const UPLOAD_SEGMENT = "/image/upload/"

export function imageUrl(src: string, width: number): string {
    if (!src.startsWith(CLOUDINARY_PREFIX) || !src.includes(UPLOAD_SEGMENT)) {
        return src
    }

    return src.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}f_auto,q_auto,c_limit,w_${width}/`)
}