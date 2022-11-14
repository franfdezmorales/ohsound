

const sizes = {
    'large': 640, 
    'medium': 300, 
    'small': 64
}

export const getFormattedImage = (images, size) => {

    for (let i = 0; i < images.length; i++) {
        const image = images[i]
        if (image.width === sizes[size]) {
            return image
        }
    }

    return 0
}