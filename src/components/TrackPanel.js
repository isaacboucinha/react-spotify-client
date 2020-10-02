import React from "react";
import AlbumIcon from "./AlbumIcon";

import {truncate} from "../utils";

class TrackPanel extends React.Component {
    render() {
        return (
            <div className="track-panel-parent">
                <strong>Tracks</strong>
                <hr />
                <div className="track-panel-container">
                    {this.props.tracks && this.props.tracks.length > 0 ? 
                    (
                        this.props.tracks.map((track) => {
                            return <AlbumIcon key={track.id} mainTitle={truncate(track.name, 20)} 
                                        secondaryTitle={truncate(track.artists
                                                        .map(artist => artist.name)    
                                                        .reduce((s1, s2) => s1 + "," + s2), 20)}
                                        album={track.album}/>;
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

export default TrackPanel;