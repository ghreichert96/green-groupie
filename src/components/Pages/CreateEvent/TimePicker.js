import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: '100%',
    marginBottom: 20
  }
});

function TimePickers(props) {
  const { classes } = props;

  return (
    <TextField
      id={props.id}
      label={props.name}
      type="time"
      defaultValue= {props.time}
      className={classes.textField}
      onChange={props.handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
  );
}

TimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimePickers);
