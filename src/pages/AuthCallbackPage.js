import React from "react";
import { Redirect } from "react-router";

import UserContext from "../context/UserContext";

import { getUserInfo } from "../spotify-client";
import LoadingSpinner from "../components/LoadingSpinner";

class AuthCallbackPage extends React.Component {
    static contextType = UserContext;

    constructor() {
        super();
        this.state = {
            userInfoFetched: false
        }
    }

    componentDidMount() {
        let locationHash = window.location.hash;
        const hash2Obj = locationHash
                            .replace("#", "")
                            .split("&")
                            .map(v => v.split("="))
                            .reduce((pre, [key, value]) => ({ 
                                ...pre, [key]: value
                            }), {} );

        let accessToken = hash2Obj["access_token"];
        

        getUserInfo(accessToken).then((user) => {
            const { setUser } = this.context;
            setUser(user);
            sessionStorage.setItem('access_token', accessToken);
            sessionStorage.setItem('user', JSON.stringify(user));
            this.setState({ userInfoFetched: true });
        });
    }

    render() {
        return (
            !this.state.userInfoFetched ? <LoadingSpinner /> : 
            <Redirect to="/"></Redirect>
        );
    }
}

export default AuthCallbackPage;