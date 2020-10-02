import React from "react";
import { AlbumPanel, ArtistPanel, PlaylistPanel, SearchBar, TrackPanel, UserInfo } from "../components";

import { search } from "../spotify-client";

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            artists: [],
            tracks: [],
            albums: [],
            playlists: []
        }
    }

    handleSearch = (query) => {
        let accessToken = window.sessionStorage.getItem("access_token");
        search(query, accessToken).then((data) => {
            this.setState({
                artists: data.artists,
                tracks: data.tracks,
                albums: data.albums,
                playlists: data.playlists
            });
        });
    }

    render() {
        return (
            <div className="">
                <UserInfo />
                <div className="searchbar-container">
                    <SearchBar onSearchSubmit={this.handleSearch}/>
                </div>
                <div className="categories-container">
                    <TrackPanel tracks={this.state.tracks}/>
                    <AlbumPanel albums={this.state.albums}/>
                    <ArtistPanel artists={this.state.artists}/>
                    <PlaylistPanel playlists={this.state.playlists}/>
                </div>
            </div>
        );
    }
}

export default HomePage;