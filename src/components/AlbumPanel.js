import React from "react";
import AlbumIcon from "./AlbumIcon";

import {truncate} from "../utils";

class AlbumPanel extends React.Component {
    render() {
        return (
            <div className="track-panel-parent">
                <strong>Albums</strong>
                <hr />
                <div className="track-panel-container">
                    {this.props.albums && this.props.albums.length > 0 ? 
                    (
                        this.props.albums.map((album) => {
                            return <AlbumIcon key={album.id} mainTitle={truncate(album.name, 20)} 
                                        secondaryTitle={truncate(album.artists
                                                        .map(artist => artist.name)    
                                                        .reduce((s1, s2) => s1 + "," + s2), 20)}
                                        album={album}/>;
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

export default AlbumPanel;