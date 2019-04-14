import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import MeetingLength from './MeetingLength';
import Checkbox from './Checkbox';
import TextInput from './TextInput';
import MultipleEmail from "./MultipleEmail";




const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function CreateEvent(props) {
  const { classes } = props;
  let date = new Date().toISOString().substring(0,10)
  
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Meeting Details
        </Typography>
        <DatePicker name={'Start Date'} date = {date}/>
        <DatePicker name={'End Date'} date = {date}/>
        <TimePicker name={'Start Time'} time = {'10:00'} />
        <TimePicker name={'End Time'} time = {'18:00'} />
        <MeetingLength />
        <Checkbox name={'Send me a copy'}/>
        <MultipleEmail />
        <TextInput />

        
        
      </CardContent>
      <CardActions>
        <Button size="small">Cancel</Button>
        <Button size="small">Send</Button>
      </CardActions>
    </Card>
  );
}

CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CreateEvent);