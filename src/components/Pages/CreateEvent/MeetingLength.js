import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
  state = {

    open: false,
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (

       
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Length</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.props.length}
            onChange={this.props.handleChange}
            name = {'length'}
            // inputProps={{
            //   value: {this.props.length},
            //   name: 'length',
            //   id: 'demo-controlled-open-select',
            // }}

          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={15}> 15 mins</MenuItem>
            <MenuItem value={30}> 30 mins</MenuItem>
            <MenuItem value={60}> 60 mins</MenuItem>
            <MenuItem value={90}> 90 mins</MenuItem>
            <MenuItem value={120}> 120 mins</MenuItem>
          </Select>
        </FormControl>

    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
