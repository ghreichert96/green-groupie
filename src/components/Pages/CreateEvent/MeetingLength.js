import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core';

const styles = {
  formControl: {
    display: 'block',
    marginBottom: 20
  },
  select: {
    width: '100%'
  }
}

function MeetingLength({ classes, length, handleChange }) {
  return (
    <FormControl className={classes.formControl} autoComplete="off">
      <InputLabel htmlFor="length">Length</InputLabel>
      <Select className={classes.select}
              value={length}
              onChange={handleChange}
              inputProps={{
                name: 'length',
                id: 'length'
              }}>
        <MenuItem value={15}>15 mins</MenuItem>
        <MenuItem value={30}>30 mins</MenuItem>
        <MenuItem value={60}>60 mins</MenuItem>
        <MenuItem value={90}>90 mins</MenuItem>
        <MenuItem value={120}>120 mins</MenuItem>
      </Select>
    </FormControl>
  );
}

export default withStyles(styles)(MeetingLength);
