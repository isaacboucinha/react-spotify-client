import React, { Fragment } from "react";

import { getAlbumInfo } from "../spotify-client"
import { withRouter } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

class AlbumPage extends React.Component {
    constructor() {
        super();
        this.state = {
            album: null
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let accessToken = window.sessionStorage.getItem("access_token");
        getAlbumInfo(id, accessToken).then((data) => {
            this.setState({album: data});
        });
    }


    render() {
        return (
            this.state.album ? 
            (
                <div className="album-container">
                    <img className="album-photo" alt="Album Cover" src={this.state.album.images[0].url}/>
                    <p className="album-title">{this.state.album.name}</p>
                    <div className="by-artists-paragraph">
                        <p>by</p>
                        {this.state.album.artists.map((artist) => {
                            return (
                                <Link to={`/artist/${artist.id}`} key={artist.id}>
                                    <p className="album-artist">{artist.name}</p>
                                </Link>
                            );
                        })}
                    </div>
                    <p className="album-release-date">{"Release Date: " + this.state.album.release_date}</p>
                    <div className="album-tracks">
                        <p>Tracks</p>
                        <hr />
                        {this.state.album.tracks.items.map((track, index) => {
                            return (
                                <Fragment key={track.id}>
                                    <div className="track-row">
                                        <p className="track-index">{index + 1 + ". "}</p>
                                        <p className="track-name">{track.name}</p>
                                    </div>
                                    <hr />
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            )
            :
            (
                <LoadingSpinner />
            )
        );
    }
}

export default withRouter(AlbumPage);