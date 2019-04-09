import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import OutlineButton from './OutlineButton'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});

function ListDividers(props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root}>
      <ListItem>
        <ListItemText primary="Google Cal" />
        <OutlineButton name="Import"/>
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItemText primary="iCal" />
        <OutlineButton name="Import"/>
      </ListItem>
      <ListItem>
        <ListItemText primary="Outlook" />
        <OutlineButton name="Import"/>
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary="Exchange" />
        <OutlineButton name="Import"/>
      </ListItem>
    </List>
  );
}

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);
