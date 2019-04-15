import React from 'react';
import { Link } from "react-router-dom";
import { withStyles, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, CalendarToday as CalendarTodayIcon, AddCircle as AddCircleIcon } from '@material-ui/icons';

const styles = {
    bottomNav: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f44336',
        zIndex: 500
    },
    icon: {
        color: '#fff'
    }
};

function NavBar({classes}) {
    return (
        <BottomNavigation className={classes.bottomNav}>
            <BottomNavigationAction component={Link} to="/profile/" className={classes.icon} label="Profile" value="account_circle" icon={<AccountCircleIcon />} />
            <BottomNavigationAction component={Link} to="/create-event/" className={classes.icon} label="Create Event" value="create_event" icon={<AddCircleIcon />} />
            <BottomNavigationAction component={Link} to="/agenda/" className={classes.icon} label="Agenda" value="agenda" icon={<CalendarTodayIcon />} />
        </BottomNavigation>
    );
}

export default withStyles(styles)(NavBar);