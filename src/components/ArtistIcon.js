import React from "react";
import { Link } from "react-router-dom";

class ArtistIcon extends React.Component {
    render() {
        return (
            <div className="artist-icon-container">
                <Link to={"/artist/" + this.props.artist.id}>
                    <img className="artist-icon" alt="Artist" src={this.props.artist.images[0].url}/>
                    <p>{this.props.mainTitle}</p>
                </Link>
            </div>
        );
    }
}

export default ArtistIcon;