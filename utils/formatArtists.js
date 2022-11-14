

export const getFormattedArtists = (artists) => {
    return artists.reduce((totalArtists, artist) => {
        return totalArtists += totalArtists.length > 0 ? `, ${artist.name}` : `${artist.name}`
    }, '')
}