import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import AuthContext from '../../util/AuthContext';
import { withStyles, CircularProgress } from '@material-ui/core';
import MeetingCard from './MeetingCard';
import CategorizedMeeting from './CategorizedMeeting';

const styles = {
    loading: {
        textAlign: 'center',
        paddingTop: 16
    }
}

class AllEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: null
        };

        firebase.auth().onAuthStateChanged(user => (user ? this.updateDocs() : void(0)));
    }

    updateDocs = () => {
        const db = firebase.firestore();
        db.collection("meeting-proposals").where("organizer_id", "==", this.context.uid).get().then(snap => {
            this.setState({events: snap.docs});
        });
    }

    render() {
        const { events } = this.state;
        const { classes } = this.props;

        let today = new Date().getTime();


      function checkupcoming(events) {
        return Date.parse(events.data().start_date) > today;

      }

      function checkpast(events) {
        return Date.parse(events.data().start_date) <= today;

      }

      // function pending(events) {
      //   return events.scheduled_time != null
      //
      // }



        if (events === null) {
            return (
                <div className={classes.loading}><CircularProgress /></div>
            );
        } else {
            return (


                <div>
                    <CategorizedMeeting
                    title = 'Upcoming Meeting'/>

                    {events.filter(checkupcoming).map(event => (

                  <MeetingCard

                    meeting_name = {event.data().meeting_name}
                    meeting_start_date = {event.data().start_date}
                    // meeting_start_date = {event.data().earliest.Date}
                    // meeting_start_time = {event.data().earliest.Time}
                    // meeting_end_date = {event.data().latest.date}
                    // meeting_end_time = {event.data().latest.time}
                    // location = {event.data().location}
                    location = "Mudd Libary"
                  />




                  //<div key={event.id}>{event.data().meeting_name}</div>

                ))}
                  <CategorizedMeeting
                    title = 'Pending Meeting'/>

                  <CategorizedMeeting
                    title = 'Past Meeting'/>

                  {events.filter(checkpast).map(event => (

                    <MeetingCard

                      meeting_name = {event.data().meeting_name}
                      meeting_start_date = {event.data().start_date}
                      // meeting_start_date = {event.data().earliest.Date}
                      // meeting_start_time = {event.data().earliest.Time}
                      // meeting_end_date = {event.data().latest.date}
                      // meeting_end_time = {event.data().latest.time}
                      // location = {event.data().location}
                      location = "Mudd Libary"
                    />




                    //<div key={event.id}>{event.data().meeting_name}</div>

                  ))}

                </div>

            );
        }
    }
}
AllEvents.contextType = AuthContext;

export default withStyles(styles)(AllEvents);