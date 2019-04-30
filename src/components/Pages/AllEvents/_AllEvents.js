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
        db.collection("meetings").where("organizer_id", "==", this.context.uid).get().then(snap => {
            this.setState({events: snap.docs});
        });
    }

    render() {
        const { events } = this.state;
        const { classes } = this.props;


        let today = new Date().getTime()/1000;





      function checkupcoming(events) {
        // return Date.parse(events.data().start_date) > today;


        return events.data().scheduled_time != null && events.data().scheduled_time.seconds > today;

      }

      function checkpast(events) {
        // return Date.parse(events.data().start_date) <= today;
        return events.data().scheduled_time != null && events.data().scheduled_time.seconds < today;

      }

      function checkpending(events) {
        return events.data().scheduled_time == null

      }



        if (events === null) {
            return (
                <div className={classes.loading}><CircularProgress /></div>
            );
        } else {
            return (


                <div >
                    <CategorizedMeeting
                    title = 'Upcoming Meeting'/>

                    {events.filter(checkupcoming).map(event => (

                  <MeetingCard
                    key={event.id}
                    meeting_name = {event.data().name}
                    // meeting_start_date = {event.data().start_date}
                    meeting_earliest = {new Date(event.data().scheduled_time.seconds * 1000).toLocaleString()}
                    meeting_latest = {new Date(event.data().scheduled_time.seconds * 1000 + event.data().duration * 60000).toLocaleString()}
                    ispending1 = 'From: '
                    ispending2 = 'To: '

                    // location = {event.data().location}
                    location = "Mudd Libary"
                  />




                  //<div key={event.id}>{event.data().meeting_name}</div>

                ))}
                  <CategorizedMeeting
                    title = 'Pending Meeting'/>
                  {events.filter(checkpending).map(event => (

                    <MeetingCard
                      key={event.id}
                      meeting_name = {event.data().name}
                      // meeting_start_date = {event.data().start_date}
                      meeting_earliest = {new Date(event.data().earliest.seconds * 1000).toLocaleString()}
                      ispending1 = 'Earliest: '
                      ispending2 = 'Latest: '
                      meeting_latest = {new Date(event.data().latest.seconds * 1000).toLocaleString()}

                      // location = {event.data().location}
                      location = "Mudd Libary"
                    />


                    //<div key={event.id}>{event.data().meeting_name}</div>

                  ))}



                  <CategorizedMeeting
                    title = 'Past Meeting'/>

                  {events.filter(checkpast).map(event => (

                    <MeetingCard
                      key={event.id}
                      meeting_name = {event.data().name}
                      // meeting_start_date = {event.data().start_date}
                      meeting_earliest = {new Date(event.data().scheduled_time.seconds * 1000).toLocaleString()}

                      meeting_latest = {new Date(event.data().scheduled_time.seconds * 1000 + event.data().duration * 60000).toLocaleString()}
                      ispending1 = 'From: '
                      ispending2 = 'To: '

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