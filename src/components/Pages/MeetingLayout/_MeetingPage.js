import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import AuthContext from '../../util/AuthContext';
import { withStyles, CircularProgress } from '@material-ui/core';

const styles = {
    loading : {
        textAlign: "center",
        verticalAlign: "center"
    }

}

class MeetingPage extends React.Component {
    constructor(props) {
        // Super calls the default Reac.Component constructor
        // js, syntactic sugar
        super(props);
        this.state = {
            // vpid(0) returns undefined
            meeting: void (0)
        };
    }

    render() {
        // props becomes a property of this istance of MeetinPage
        // const { meeting_id } = this.props.match.params;
        // purpose here is destructuring
        const {meeting} = this.state;
        // getting class names from props, the styling(properties in JSX)
        const {
            classes,
            match: {
                params: {
                    meeting_id
                }
            }
        } = this.props;

        if (typeof (meeting) == "undefined") {
            return (
                <div className={classes.loading}><CircularProgress/></div>
            );
        }
    }
}
// Allows us to get the status of whether user is logged in
MeetingPage.contextType = AuthContext;

    // virtual component, between the component that would have mounted MeetingPage
export default withStyles(styles)(MeetingPage);