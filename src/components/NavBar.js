import React, { Fragment } from "react";
import { NavLink as RouterNavLink, Redirect } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import UserContext from "../context/UserContext";

class NavBar extends React.Component {
    static contextType = UserContext;

    constructor() {
        super();
        this.state = {
            userLoggedOff: false
        };
    }

    logOut = () => {
        const { setUser } = this.context;
        setUser(null);
        window.sessionStorage.removeItem("user");
        window.location = "/"
        this.setState()
    }

    render() {
        const { user } = this.context;
        return (
            user === null ?
            (
                this.state.userLoggedOff ? 
                (
                    <Redirect to="/"></Redirect>
                )
                :
                (
                    <Fragment />
                )
            ) 
            : 
            (
                <Navbar bg="light" expand="md">
                    <Container>
                        <Nav className="mr-auto">
                            Welcome, {user.display_name}!
                        </Nav>
                        <Nav className="mr-auto">
                            <Nav.Link
                                as={RouterNavLink}
                                to="/"
                                exact
                                activeClassName="router-link-exact-active"
                            >
                                
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Button className="logout-button" onClick={this.logOut}>
                                Log Out
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            )
        );
    }
}

export default NavBar;