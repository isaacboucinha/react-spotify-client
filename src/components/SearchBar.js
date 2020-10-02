import React from "react";
import { Button } from "react-bootstrap";

class SearchBar extends React.Component {
    constructor() {
        super();
        this.input = React.createRef();
    }

    handleSearch = () => {
        this.props.onSearchSubmit(this.input.current.value);
    }

    render() {
        return (
            <div className="search-bar-container">
                <input className="search-bar" type="text" placeholder="Search for a track, album or artist" ref={this.input} />
                <Button className="search-button" onClick={this.handleSearch}>Go</Button>
            </div>
        );
    }
}

export default SearchBar;