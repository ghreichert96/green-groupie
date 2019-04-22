import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import MeetingLength from './MeetingLength';
import MessageInput from './MessageInput';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthContext from '../../util/AuthContext';
import firebase from 'firebase/app';
import 'firebase/firestore';
import axios from 'axios';

const styles = {
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
  },
  pos: {
    marginBottom: 12,
  },
  createEventForm: {
    padding: 15,
    overflowX: 'hidden'
  },
  title: {
    marginBottom: 15
  },
  subhead: {
    marginTop: 20,
    marginBottom: 15
  },
  input: {
    width: '100%',
    marginBottom: 20
  },
  submitContainer: {
    textAlign: 'right'
  },
  participant: {
    padding: 8,
    margin: '0 10px 10px 0',
    display: 'inline-flex',
    backgroundColor: '#ccc',
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  removeParticipant: {
    background: 'transparent',
    border: 'none',
    marginLeft: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 16
  },
  loading: {
    height: 'calc(100vh - 112px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingTitle: {
    marginBottom: 30
  }
};

class CreateEvent extends Component {
  constructor(props) {
    console.log('props',props)
    // console.log('context',context)
    super(props);

    const date = new Date();
    const startDateStr = date.toISOString().substring(0, 10);
    date.setDate(date.getDate() + 7);
    const endDateStr = date.toISOString().substring(0, 10);

    this.state = {
      length: 30,
      startDate: startDateStr,
      startTime: '09:00',
      endTime: '17:00',
      endDate: endDateStr,
      participants: [],
      participantTemp: "",
      creating: false,
      created: false,
      error: {
        participantsError: "",
        meetingNameError: ""
      },
      message: "Hi,\n\nPlease come to my meeting.\n\nThanks!",
      subject: "Meeting Request",
      creationError: ""
    };
  }

  validateEmail = email => (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  )

  clearErrors = () => {
    this.setState({error: {
      participantsError: "",
      meetingNameError: ""
    }});
  }

  handleFormSubmit = e => {
    this.clearErrors();

    const {participants, meetingName, length, startDate, startTime, endDate, endTime} = this.state;

    if (participants.length === 0) {
      this.setState((state) => ({
        error: {
          ...state.error,
          participantsError: 'Please add at least one other participant.'
        }
      }));
      return;
    }

    if (meetingName === "") {
      this.setState((state) => ({
        error: {
          ...state.error,
          meetingNameError: "Name cannot be empty."
        }
      }));
      return;
    }

    this.setState({creating: true});

    console.log('testing concat',[this.context.email].concat(this.state.participants))
    axios.post('https://backend-groupie.appspot.com/email', {
      subject: this.state.subject,
      message: this.state.message,
      emails: [this.context.email].concat(this.state.participants)
    })
      .then(function (response) {
            console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

    // const db = firebase.firestore();

    // db.collection("meeting-proposals").add({
    //   duration: length,
    //   "start_time": startTime,
    //   "end_time": endTime,
    //   "start_date": startDate,
    //   "end_date": endDate,
    //   "organizer_id": this.context.uid,
    //   "scheduled_meeting_id": "",
    //   participants: participants,
    //   "meeting_name": meetingName
    // }).then(docRef => {
    //   console.log("Created meeting with ID " + docRef.id);
    //   this.setState({created: true});
    // }).catch(error => {
    //   console.log(error);
    //   this.setState({creationError: error});
    // });


}


  resetForm = () => {
    this.setState({
      creationError: "",
      created: false,
      creating: false
    });
  }

  resetFormHard = () => {
    const date = new Date();
    const startDateStr = date.toISOString().substring(0, 10);
    date.setDate(date.getDate() + 7);
    const endDateStr = date.toISOString().substring(0, 10);

    this.setState({
      length: 30,
      startDate: startDateStr,
      startTime: '09:00',
      endTime: '17:00',
      endDate: endDateStr,
      participants: [],
      participantTemp: "",
      creating: false,
      created: false,
      error: {
        participantsError: "",
        meetingNameError: ""
      },
      message: "Hi,\n\nPlease come to my meeting.\n\nThanks!",
      subject: "Meeting Request",
      creationError: ""
    });
  }

  handleSelectInput = e => {
    let value = e.target.value;

    this.setState({length: value});
  }

  handleInput = e => {
    let value = e.target.value;
    let name = e.target.id;

    this.setState({[name]: value});
  }


  handleDelete = i => {
    const { participants } = this.state;
    this.setState({
        participants: participants.filter((el) => el !== i),
    });
  }

  handleTagInput = (e) => {
    if (!(["Enter",",",";"].includes(e.key)))
      return;

    this.clearErrors();

    e.preventDefault();

    const tag = this.state.participantTemp.toLowerCase();

    if (!this.validateEmail(tag)) {
      this.setState((state) => (
        {
          error: {
            ...state.error,
            participantsError: tag + " is not a valid email address."
          }
        }
      ))
      return;
    }

    if (tag === this.context.email.toLowerCase()) {
      this.setState((state) => (
        {
          error: {
            ...state.error,
            participantsError: "You cannot add yourself to a meeting."
          }
        }
      ))
      return;
    }

    this.setState({
      participantTemp: ""
    });

    if (this.state.participants.includes(tag)) {
      return;
    }

    this.setState((state) => (
      {participants: [...state.participants, tag]}
    ));
  }

  render() {
    const { classes } = this.props;
    const { creationError, meetingName, created, error, creating, message, length, participants, startDate, endDate, startTime, endTime, participantTemp, subject } = this.state;

    if (creating) {
      if (created) {
        if (creationError !== "") {
          return (
            <div className={classes.loading}>
              <Typography className={classes.loadingTitle} variant="h5">
                Event created.
              </Typography>
              <Button color="primary" variant="contained" onClick={this.resetFormHard}>Make Another</Button>
            </div>
          );
        } else {
          return (
            <div className={classes.loading}>
              <Typography className={classes.loadingTitle} variant="h5">
                Event failed to create.
              </Typography>
              <Typography className={classes.loadingTitle} variant="subtitle1">
                {creationError}
              </Typography>
              <Button color="primary" variant="contained" onClick={this.resetForm}>Try Again</Button>
            </div>
          );
        }
      } else {
        return (
          <div className={classes.loading}>
            <Typography className={classes.loadingTitle} variant="h5">
              Creating event...
            </Typography>
            <CircularProgress />
          </div>
        );
      }
    } else {
      return (
        <form className={classes.createEventForm}>
          <Typography className={classes.title} variant="h4">
            Create meeting
          </Typography>
          <TextField error={error.meetingNameError !== ""} className={classes.input} value={meetingName} name='meeting_name' label='Meeting name' id='meetingName' onInput={this.handleInput} helperText={error.meetingNameError} />
          <DatePicker name='Earliest date' date={startDate} id='startDate' handleChange={this.handleInput} />
          <DatePicker name='Latest date' date={endDate} id='endDate' handleChange={this.handleInput} />
          <TimePicker name='Earliest time' time={startTime} id='startTime' handleChange={this.handleInput} />
          <TimePicker name='Latest time' time={endTime} id='endTime' handleChange={this.handleInput} />
          <MeetingLength handleChange={this.handleSelectInput} length={length} />
          <TextField error={error.participantsError !== ""}
                     label='Add participants (comma separated)'
                     name='participants'
                     id='participantTemp'
                     onKeyDown={this.handleTagInput}
                     value={participantTemp}
                     onInput={this.handleInput}
                     helperText={error.participantsError}
                     autoComplete="off"
                     className={classes.input} />
          <div className={classes.participants}>
            {participants.map(tag => (
              <span className={classes.participant} key={tag}>
                <span>{tag}</span>
                <button className={classes.removeParticipant} onClick={this.handleDelete.bind(this, tag)} type="button">x</button>
              </span>
            ))}
          </div>
          <MessageInput handleChange={this.handleInput} id='message' message={message} subject={subject} />
          <div className={classes.submitContainer}>
            <Button color="primary" variant="contained" onClick={this.handleFormSubmit}>Create event</Button>
          </div>
        </form>
      );
    }
  }
}
CreateEvent.contextType = AuthContext;
// const MapElement = (styles) => (
//   <AuthContext.Consumer>
//     {context =>
//       <CreateEvent classes={styles} bet={context} />
//     }
//   </AuthContext.Consumer>
// )
export default withStyles(styles)(CreateEvent);
