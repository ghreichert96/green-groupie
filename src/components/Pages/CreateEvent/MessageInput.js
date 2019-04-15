import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  textField: {
    width: '100%'
  },
  multiline: {
    width: '100%',
    marginBottom: 25
  }
};

function MessageInput({ classes, handleChange, subject, message }) {
  return (
    <React.Fragment>
      <TextField  id="subject"
                  label="Email subject"
                  className={classes.textField}
                  margin="normal"
                  onChange={handleChange}
                  value={subject} />
      <TextField id="message"
                  label="Email body"
                  className={classes.multiline}
                  margin="normal"
                  onChange={handleChange}
                  value={message}
                  multiline />
    </React.Fragment>
  );
}

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageInput);
