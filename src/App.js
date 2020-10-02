import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

//components
import { NavBar, Footer } from "./components";

//pages
import { LoginPage, AuthCallbackPage, HomePage, AlbumPage, ArtistPage } from "./pages";


import UserContext from "./context/UserContext";


class App extends React.Component {
  static contextType = UserContext;
 
  componentWillMount() {
    const { setUser } = this.context;
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user) {
      setUser(user)
    } else user = this.context.user;
  }

  render() {
    const { user } = this.context;
    return (
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact render={props =>
              !user ? (
                <LoginPage {...props} />
              ) : (
                <HomePage />
              )
            } />
            <Route path="/callback">
              <AuthCallbackPage />
            </Route>
            <Route path="/album/:id">
              <AlbumPage />
            </Route>
            <Route path="/artist/:id">
              <ArtistPage />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default App;
