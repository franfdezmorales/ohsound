const client_id = process.env.SPOTIFY_ID
const client_secret = process.env.SPOTIFY_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?q=genre:pop&type=track&include_external=audio&limit=50`


const getAccessToken = async () => {

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token
        })
    });

    return response.json();
};

export const getSongs = async () => { 
    const { access_token } = await getAccessToken()

    const songs = await fetch(SEARCH_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    return songs.json()
}

export const getSearchSongs = async (search) => {

    const { access_token } = await getAccessToken()

    const songs = await fetch(`https://api.spotify.com/v1/search?q=${search} genre:pop&type=track&include_external=audio&limit=5`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    return songs.json()
}

