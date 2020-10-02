import React from "react";

import { checkIfUserFollowsArtist, followArtist, getArtistInfo, unfollowArtist } from "../spotify-client"
import { withRouter } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "react-bootstrap";

class ArtistPage extends React.Component {
    constructor() {
        super();
        this.state = {
            artist: null,
            userIsFollowingArtist: null
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let accessToken = window.sessionStorage.getItem("access_token");
        getArtistInfo(id, accessToken).then((data) => {
            this.setState({artist: data});
            checkIfUserFollowsArtist(data.id, accessToken).then((res) => {
                this.setState({userIsFollowingArtist: res});
            });
        });

    }

    toggleFollowing = () => {
        const accessToken = window.sessionStorage.getItem("access_token");
        if(this.state.userIsFollowingArtist) {
            unfollowArtist(this.state.artist.id, accessToken).then(() => {
                this.setState({userIsFollowingArtist: false})
            });
        } else {
            followArtist(this.state.artist.id, accessToken).then(() => {
                this.setState({userIsFollowingArtist: true})
            });
        }
    }

    render() {
        return (
            this.state.artist && this.state.userIsFollowingArtist !== null ? 
            (
                <div className="artist-container">
                    <img className="artist-photo" alt="Artist Cover" src={this.state.artist.images[0].url}/>
                    <p className="artist-title">{this.state.artist.name}</p>
                    <Button className="following-button" onClick={this.toggleFollowing}>
                        {this.state.userIsFollowingArtist ? "Unfollow" : "Follow"}
                    </Button>
                </div>
            )
            :
            (
                <LoadingSpinner />
            )
        );
    }
}

export default withRouter(ArtistPage);