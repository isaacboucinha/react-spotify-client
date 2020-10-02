import React from "react";
import spotifyLogo from '../spotify_logo.svg';

import UserContext from "../context/UserContext";
import { Button } from "react-bootstrap";

import { authorizeUser } from "../spotify-client"

class LoginPage extends React.Component {
    static contextType = UserContext;

    logIn = () => {
        authorizeUser();
    }

    render() {
        const { user } = this.context;
        return (
            <div className="text-center my-5">
                <img className="mb-3 app-logo" src={spotifyLogo} alt="Spotify logo" width="60" />
                <h1 className="mb-4">React.js Sample Project</h1>

                <p className="lead">
                    This is a sample Spotify Client application. To begin, simply log in to your Spotify Account.
                </p>

                <Button className="login-button" onClick={this.logIn}>
                    Log In To Spotify
                </Button>
                {user !== null && <p>{`Current User: ${user.name}`}</p>}
            </div>
        );
    }
}

export default LoginPage;