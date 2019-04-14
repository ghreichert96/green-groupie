import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class CheckboxLabels extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  };

  handleChange = name => event => {
//    this.setState({ [name]: event.target.checked });
    this.props.checked(event.target.checked);
  };

  render() {
    return (
      <FormGroup row>
       
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.checkBox}
              onChange={this.props.handleChange}
              value="false"
              color="primary"
            />
          }
          label={this.props.name}
        />
        
        
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
