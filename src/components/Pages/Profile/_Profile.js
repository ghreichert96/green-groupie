import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Divider, Button } from '@material-ui/core';
import UserInfo from './UserInfo';
import firebase from 'firebase/app';
import 'firebase/auth';
import Accounts from './Accounts';

const styles = {
  container: {
    padding: 15,
    position: 'relative'
  },
  logoutButton: {
    marginTop: 15
  }
};

const logout = () => {
    window.setTimeout(() => {firebase.auth().signOut()}, 250);
};

const deleteAccount = id => {
  firebase.firestore().collection("integrations").doc(id).delete();
};

const addAccount = uid => {
  fetch('http://groupie-backend.herokuapp.com/add?uid=' + uid).then(res => res.text().then(text => window.location.replace(text)));
};

const Profile = ({classes, userName: name, userEmail: email, userAccounts: accounts, uid}) => (
  <div className={classes.container}>
    <UserInfo name={name} email={email} />
    <Divider />
    <Accounts accounts={accounts} deleteAccount={deleteAccount} addAccount={addAccount.bind(null, uid)} />
    <Divider />
    <Button className={classes.logoutButton} color="primary" onClick={logout}>Log out</Button>
  </div>
);

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);


