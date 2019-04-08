import React from 'react';
import './App.css';
import Agenda from './Agenda.js';
import { AppBar, Toolbar, withStyles, Typography, BottomNavigation, BottomNavigationAction, MuiThemeProvider} from '@material-ui/core';
import {Menu as MenuIcon, AccountCircle as AccountCircleIcon, CalendarToday as CalendarTodayIcon} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import {theme as Theme} from '../index';

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  },
};

function App({classes}) {
  return (
    <MuiThemeProvider theme={Theme}>
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
          <BottomNavigationAction label="" value="" />
          <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircleIcon />} />
          <BottomNavigationAction label="Meetings" value="meetings" icon={<CalendarTodayIcon />} />
        </BottomNavigation>
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
