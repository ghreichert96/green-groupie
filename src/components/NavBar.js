import React from 'react';
import { Link } from "react-router-dom";
import { withStyles, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, CalendarToday as CalendarTodayIcon, Add as AddIcon } from '@material-ui/icons';

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
            <Link to="/profile/">
                <BottomNavigationAction className={classes.icon} label="Profile" value="account_circle" icon={<AccountCircleIcon />}/>
            </Link>
            <Link to="/create-event/">
                <BottomNavigationAction className={classes.icon} label="Meetings" value="meetings" icon={<AddIcon />} />
            </Link>
            <Link to="/agenda/">
                <BottomNavigationAction className={classes.icon} label="Agenda" value="Agenda" icon={<CalendarTodayIcon />} />
            </Link>
        </BottomNavigation>
    );
}

export default withStyles(styles)(NavBar);