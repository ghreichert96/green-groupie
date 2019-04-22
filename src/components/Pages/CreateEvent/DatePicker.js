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

function DatePickers(props) {
  const { classes } = props;

  return (
    <TextField
      id={props.id}
      label= {props.name}
      type="date"
      defaultValue={props.date}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={props.handleChange}
    />
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
