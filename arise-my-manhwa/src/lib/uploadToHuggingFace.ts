export async function uploadToHuggingFace(file: File) {
    const UPOLOAD_URL="https://huggingface.co/uploads"

    const response = await fetch(UPOLOAD_URL, {
        method: 'POST',
        headers: {
            'Content-Type':file.type,
            'X-requested-With' : 'XMLHttpRequest',
        },

        /**File inherits from blob */
        body : file,
    })

    const url = await response.text()

    return url
}
