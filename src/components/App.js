import React from 'react';
import './App.css';
import Agenda from './Agenda';
import { AppBar, Toolbar, withStyles, Typography, BottomNavigation, BottomNavigationAction, MuiThemeProvider} from '@material-ui/core';
import {Menu as MenuIcon, AccountCircle as AccountCircleIcon, CalendarToday as CalendarTodayIcon} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import NavBar from './NavBar';
import {theme as Theme} from '../index';

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
        <NavBar />
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
