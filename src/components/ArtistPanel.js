import React from "react";
import ArtistIcon from "./ArtistIcon";

import {truncate} from "../utils";

class ArtistPanel extends React.Component {
    render() {
        return (
            <div className="track-panel-parent">
                <strong>Artists</strong>
                <hr />
                <div className="track-panel-container">
                    {this.props.artists && this.props.artists.length > 0 ? 
                    (
                        this.props.artists.map((artist) => {
                            return <ArtistIcon key={artist.id} mainTitle={truncate(artist.name, 20)} 
                                                artist={artist}/>;
                        })
                    )
                    :
                    (
                        <p>Nothing to show.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default ArtistPanel;