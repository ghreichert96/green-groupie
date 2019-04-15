import React, {Component} from 'react';
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
import MessageInput from './MessageInput';
import MultipleEmail from './MultipleEmail';
import axios from 'axios';


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

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvent: {
        subject: "",
        message: "",
      },
      checked: true,
      tags: [],
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelectInput = this.handleSelectInput.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleChecked = this.handleChecked.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

  }

  handleFormSubmit(e) {
    // Form submission logic
    this.setState();

  }

    handleSelectInput(e) {
        console.log(e)
        let value = e.target.value;
        let name = e.target.name;
        console.log(e.target.name)
        this.setState( prevState => {
                return {
                    newEvent : {
                        ...prevState.newEvent, length: value
                    }
                }
            }, () => console.log(this.state.newEvent)
        )


    }


  handleInput(e) {
    console.log(e)
    let value = e.target.value;
    let name = e.target.id;
    console.log(e.target.id)
    this.setState( prevState => {
      return {
         newEvent : {
                  ...prevState.newEvent, [name]: value
                 }
      }
    }, () => console.log(this.state.newEvent)
    )
 }

  handleChecked(e){
    console.log(e.target.checked)
    this.setState({checked: e.target.checked})
  }

  handleDelete(i) {
      const { tags } = this.state;
      this.setState({
          tags: tags.filter((tag, index) => index !== i),
      },
      () => console.log(this.state.tags));
  }

  handleAddition(tag) {
      this.setState(state => ({ tags: [...state.tags, tag] }),
                    () => console.log(this.state.tags));
  }

  handleDrag(tag, currPos, newPos) {
      const tags = [...this.state.tags];
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: newTags });
  }

  sendEmail = () => {
    const emailList = this.state.tags.map( tag => tag['id'])
    axios.post('https://backend-groupie.appspot.com/email', {
      subject: this.state.newEvent['subject'],
      message: this.state.newEvent['message'],
      emails: emailList
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

  }



  handleClearForm() {
  //   Logic for resetting the form
  }
  render(){
    const { classes } = this.props;
    let date = new Date().toISOString().substring(0,10)

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Meeting Details
          </Typography>
          <DatePicker name={'Start Date'} date = {date} handleChange={this.handleInput} id={'startDtate'}/>
          <DatePicker name={'End Date'} date = {date} id={'endDate'} handleChange={this.handleInput}/>
          <TimePicker name={'Start Time'} time = {'10:00'} id={'startTime'} handleChange={this.handleInput}/>
          <TimePicker name={'End Time'} time = {'18:00'} id={'endTime'} handleChange={this.handleInput}/>
          <MeetingLength handleChange={this.handleSelectInput} id={'length'} length = {this.state.newEvent['length']}/>
          <Checkbox name={'Send me a copy'} id={'copy'} handleChange={this.handleChecked} checkBox={this.state.checked}/>
          <MultipleEmail handleDelete={this.handleDelete} handleAddition={this.handleAddition} handleDrag={this.handleDrag} tags={this.state.tags}/>
          <MessageInput handleChange={this.handleInput} id={'message'}/>
          <Button size="small">Cancel</Button>
          <Button size="small" type="submit" onClick = {this.sendEmail} >Send </Button>
        </CardContent>
      </Card>
    );
}
}
CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateEvent);
