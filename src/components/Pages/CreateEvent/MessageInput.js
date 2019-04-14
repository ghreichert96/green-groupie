import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});



class OutlinedTextFields extends React.Component {
  state = {
    subject: 'subject',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        

        
        <TextField
          required
          id="subject"
          label="Subject"
          className={classes.textField}
          defaultValue=""
          margin="normal"
          variant="outlined"
          onChange={this.props.handleChange}
        />

       

        <TextField
          
          id="message"
          label="Message"
          defaultValue="Hi,"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.props.handleChange}
        />


      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
