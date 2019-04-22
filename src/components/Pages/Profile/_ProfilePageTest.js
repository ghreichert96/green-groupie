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
import { withRouter } from 'react-router-dom'

let object;

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
    //this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    // this.handleClientLoad = this.handleClientLoad.bind(this);
  }

  componentDidMount(){
    this.initGapi()
    // this.handleClientLoad()
  }


  // handleClientLoad(){
  //   gapi.client.load('calendar');
  // }

  handleAuthSignin(){

    window.gapi.client.init({
          apiKey: 'AIzaSyDWsMR14gljCJ_rckzvQ3QKJle3OaOgsZE',
          clientId: '770506280955-uhtlvm9peki4blvs5e7hdnmna9daifsi.apps.googleusercontent.com',
          scope: "https://www.googleapis.com/auth/calendar.readonly"
    })
    .then( (result) => {
      gapi.auth2.getAuthInstance().signIn()
      console.log("jaowiefj")
      //this.listUpcomingEvents()
    })
    .then(()=>{
      gapi.client.load('calendar','v3', ()=>{
        console.log("hi")
        gapi.client.calendar.events.list({
        'calendarId': 'primary',
      })
      .then(response => {
        console.log('response',response)
        const events = response.result.items
        object = events
        events.map((event) =>{
          console.log(event);
        })

        //this could be wrong
        //this.sendData()

      })
    })})
    .catch((result)=>{
      console.log('error res: ',result)
    })
    this.props.history.push('/events')
  }


  // listUpcomingEvents() {
  //   console.log("hi")
  //   gapi.client.calendar.events.list({
  //       'calendarId': 'primary',
  //       'timeMin': (new Date()).toISOString(),
  //       'showDeleted': false,
  //       'maxResults': 50,
  //       'orderBy': 'startTime'
  //   }).then(response => {
  //     const events = response.result.items
  //     events.map((event) =>{
  //       console.log(event);
  //     })
  //   })
  // }
  
  
  
  
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
          <Button onClick={() => this.handleAuthSignin()}>
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

export default withRouter((withStyles(styles)(ListDividers)));
export {object};
