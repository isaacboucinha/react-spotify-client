import React from "react";
import UserContext from "../context/UserContext";

class UserInfo extends React.Component {
    static contextType = UserContext;
    
    constructor() {
        super();
        this.user = JSON.parse(window.sessionStorage.getItem("user"));
    }

    render() {
        return (
            <div className="user-info">
                <img className="user-info-photo" alt="Your face" src={this.user.images[0].url}/>
                <p className="user-info-followers">{this.user.followers.total} Followers</p>
            </div>

        );
    }
}

export default UserInfo;