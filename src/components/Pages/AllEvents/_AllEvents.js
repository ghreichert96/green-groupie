import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import AuthContext from '../../util/AuthContext';
import { withStyles, CircularProgress } from '@material-ui/core';

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

        if (events === null) {
            return (
                <div className={classes.loading}><CircularProgress /></div>
            );
        } else {
            return (
                <div>{events.map(event => (
                    <span key={event.id}>{event.data().meeting_name}</span>
                ))}</div>
            );
        }
    }
}
AllEvents.contextType = AuthContext;

export default withStyles(styles)(AllEvents);