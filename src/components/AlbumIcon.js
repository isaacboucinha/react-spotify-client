import React from "react";
import { Link } from "react-router-dom";

class AlbumIcon extends React.Component {
    render() {
        return (
            <div className="album-icon-container">
                <Link to={"/album/" + this.props.album.id}>
                    <img className="album-icon" alt="Album Cover" src={this.props.album.images[0].url}/>
                    <p>{this.props.mainTitle}</p>
                    <p className="secondary-title">{this.props.secondaryTitle}</p>
                </Link>
            </div>
        );
    }
}

export default AlbumIcon;