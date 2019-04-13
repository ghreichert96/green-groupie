/* global gapi */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import OutlineButton from './OutlineButton'
import { Component } from 'react'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});

class ListDividers extends Component {
  
  constructor(props){
    super(props);
    
    this.handleAuthSignin = this.handleAuthSignin.bind(this);
  
  }
  
  componentDidMount(){
    this.initGapi()
  }
  
  handleAuthSignin(){
    window.gapi.client.init({
          apiKey: 'AIzaSyDWsMR14gljCJ_rckzvQ3QKJle3OaOgsZE',
          clientId: ' 770506280955-2uqo2fm2vr6q2snt2ribrdbb2qdtbb4i.apps.googleusercontent.com ',
          scope: "https://www.googleapis.com/auth/calendar.readonly"
    })
    .then( (result) => {
      console.log('res: ',result)
    })
    .catch((result)=>{
      console.log('error res: ',result)
    })
    
  }
  
  
  initGapi = () => {
    console.log('Initializing GAPI...');
    console.log('Creating the google script tag...');

    const script = document.createElement("script");
    script.onload = () => {
      console.log('Loaded script, now loading our api...')
      // Gapi isn't available immediately so we have to wait until it is to use gapi.
      this.loadClientWhenGapiReady(script);
    };
    script.src = "https://apis.google.com/js/client.js";
    
    document.body.appendChild(script);
  }
  
  loadClientWhenGapiReady = (script) => {
    console.log('Trying To Load Client!');
    console.log(script)
    if(script.getAttribute('gapi_processed')){
      console.log('Client is ready! Now you can access gapi. :)');
      if(window.location.hostname==='localhost'){
        gapi.client.load("http://localhost:8080/_ah/api/discovery/v1/apis/metafields/v1/rest")
        .then((response) => {
          console.log("Connected to metafields API locally.");
          },
          function (err) {
            console.log("Error connecting to metafields API locally.");
          }
        );
      }
    }
    else{
      console.log('Client wasn\'t ready, trying again in 100ms');
      setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
    }
  }

  
  render(){
  
    const { classes } = this.props;
    
    
    return (
      <List component="nav" className={classes.root}>
        <ListItem>
          <ListItemText primary="Google Cal" />
          <Button onClick={this.handleAuthSignin}>
            test
          </Button>
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary="iCal" />
          <OutlineButton name="Import"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Outlook" />
          <OutlineButton name="Import"/>
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText primary="Exchange" />
          <OutlineButton name="Import"/>
        </ListItem>
      </List>
    );
  }
}

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);
