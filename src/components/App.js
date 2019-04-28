import React from 'react';
import { withStyles, MuiThemeProvider} from '@material-ui/core';
import NavBar from './NavBar';
import {theme as Theme} from '../index';
import Header from './Header';
import { Route } from 'react-router-dom';
import CreateEvent from './Pages/CreateEvent/_CreateEvent';
import Profile from './Pages/Profile/_Profile'
import AllEvents from './Pages/AllEvents/_AllEvents';
import AuthContext from './util/AuthContext';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Login from './Pages/Login/Login';

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3f51b5'
  },
  icon: {
    color: '#fff'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: void(0),
      profile: {
        name: null,
        accounts: []
      }
    };

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({currentUser: user});

      if (user) {
        firebase.firestore().collection("profile-data").doc(user.uid).get().then(userProfile => {
          this.setState(state => ({profile: {...state.profile, name: userProfile.get("name")}}));
        });
        this.accountListener = firebase.firestore().collection("integrations").where("uid", "==", user.uid).onSnapshot(snap => {
          this.setState(state => (
            {
              profile: {
                ...state.profile,
                accounts: []
              }
            }
          ));

          snap.forEach(acct => {
            this.setState(state => (
              {
                profile: {
                  ...state.profile,
                  accounts: [
                    ...state.profile.accounts,
                    {
                      type: acct.get("type"),
                      display: acct.get("display"),
                      id: acct.id
                    }
                  ]
                }
              }
            ));
          });
        });
      } else {
        this.setState({profile: {name: null, accounts: []}});
      }
    });
  }

  render() {
    const {currentUser, profile: {name: userName, accounts: userAccounts}} = this.state;
    const userEmail = typeof(currentUser) !== "undefined" && currentUser !== null ? currentUser.email : null;

    if (currentUser === null) {
      return (
        <AuthContext.Provider value={currentUser}>
          <MuiThemeProvider theme={Theme}>
              <Header />
              <Login />
          </MuiThemeProvider>
        </AuthContext.Provider>
      );
    } else {
      return (
        <AuthContext.Provider value={currentUser}>
          <MuiThemeProvider theme={Theme}>
              <Header />
              <Route path="/profile/"
                     render={props => (<Profile {...props} userName={userName} userEmail={userEmail} userAccounts={userAccounts} uid={currentUser ? currentUser.uid : null} />)} />
              <Route path="/create-event/" exact component={CreateEvent} />
              <Route path="/events/" component={AllEvents} />
              <NavBar />
          </MuiThemeProvider>
        </AuthContext.Provider>
      );
    }
  }
}

export default withStyles(styles)(App);
