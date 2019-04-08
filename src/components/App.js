import React from 'react';
import './App.css';
import Agenda from './Agenda.js';
import { AppBar, Toolbar, withStyles, Typography, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {Menu as MenuIcon, AccountCircle as AccountCircleIcon, CalendarToday as CalendarTodayIcon} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3f51b5'
  },
  icon: {
    color: '#fff'
  }
};

function App({classes}) {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Groupie
          </Typography>
        </Toolbar>
      </AppBar>
      <Agenda />
      <BottomNavigation className={classes.bottomNav}>
        <BottomNavigationAction className={classes.icon} label="" value="" />
        <BottomNavigationAction className={classes.icon} label="Profile" value="profile" icon={<AccountCircleIcon />} />
        <BottomNavigationAction className={classes.icon} label="Meetings" value="meetings" icon={<CalendarTodayIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default withStyles(styles)(App);
