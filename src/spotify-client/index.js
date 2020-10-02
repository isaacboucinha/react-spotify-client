import axios from "axios";
import buildUrl from "build-url";


const CLIENT_ID  = "60d5278752304866894919f25cd7db76";
const REDIRECT_URI = "http://localhost:3000/callback";

const AUTH_PATH = "authorize";
const USER_PATH = "me";
const SEARCH_PATH = "search";
const ALBUMS_PATH = "albums";
const ARTISTS_PATH = "artists";
const CONTAINS_PATH = "contains";
const FOLLOWING_PATH = "following";

const BASE_URL = "https://api.spotify.com/v1";
const AUTH_BASE_URL = "https://accounts.spotify.com";
const FOLLOWING_URL = BASE_URL + "/" + USER_PATH + "/" + FOLLOWING_PATH;


const authUri = buildUrl(AUTH_BASE_URL, {    
    path: AUTH_PATH,
    queryParams: {
        client_id: CLIENT_ID,
        response_type: "token",
        redirect_uri: REDIRECT_URI,
        scope: "user-follow-read user-read-email user-read-private user-follow-modify"
    }
});


function authorizeUser() {
    window.location = authUri;
}


function getUserInfo(accessToken) {
    return axios.get(BASE_URL + "/" + USER_PATH, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((res) => {
        return res.data;
    });
}

function search(query, accessToken) {
    const limit = 4;
    const offset = 0;
    const market = "US";
    const type = "track,album,artist,playlist";

    return axios.get(BASE_URL + "/" + SEARCH_PATH, {
        params: {
            q: query,
            type: type,
            market: market,
            limit: limit,
            offset: offset
        },      
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((res) => {
        res = res.data;
        let result = {};
        result.tracks = res.tracks.items;
        result.artists = res.artists.items;
        result.albums = res.albums.items;
        result.playlists = res.playlists.items;
        return result;
    });
}


function getArtistInfo(artistId, accessToken) {
    return axios.get(BASE_URL + "/" + ARTISTS_PATH + `/${artistId}`, {
        params: {
            
        },      
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((res) => {
        return res.data;
    });
}


function getAlbumInfo(albumId, accessToken) {
    return axios.get(BASE_URL + "/" + ALBUMS_PATH + `/${albumId}`, {
        params: {
            
        },      
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((res) => {
        return res.data;
    });
}


function getUsersFollowedArtists(accessToken) {
    return axios.get(FOLLOWING_URL, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((res) => {
        return res.data;
    });
}

function checkIfUserFollowsArtist(artistId, accessToken) {
    return axios.get(FOLLOWING_URL + "/" + CONTAINS_PATH, {
        params: {
            ids: artistId,
            type: "artist"
        },      
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((res) => {
        return res.data[0];
    });
}

function followArtist(artistId, accessToken) {
    return axios.put(FOLLOWING_URL + "?type=artist&ids=" + artistId, {}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        return res.data;
    });
}

function unfollowArtist(artistId, accessToken) {
    return axios.delete(FOLLOWING_URL + "?type=artist&ids=" + artistId, {
        params: {
        },
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        return res.data;
    });
}

export { authorizeUser, 
        getUserInfo,
        search, 
        getArtistInfo, 
        getAlbumInfo,
        getUsersFollowedArtists,
        checkIfUserFollowsArtist,
        followArtist,
        unfollowArtist
    };