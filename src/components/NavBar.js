import React from 'react';
import Agenda from './Agenda.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateEvent from './CreateEvent';
import InviteScreen from './InviteScreen';
import { withStyles, Typography, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
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
        <Router>
            <div>
                <nav>
                    <BottomNavigation className={classes.bottomNav}>
                        <Link to="/invite-screen/">
                            <BottomNavigationAction className={classes.icon} label="" value="account_circle" icon={<AccountCircleIcon />}/>
                        </Link>
                        <Link to="/create-event/">
                            <BottomNavigationAction className={classes.icon} label="Meetings" value="meetings" icon={<AddIcon />} />
                        </Link>
                        <Link to="/agenda/">
                            <BottomNavigationAction className={classes.icon} label="Agenda" value="Agenda" icon={<CalendarTodayIcon />} />
                        </Link>
                    </BottomNavigation>
                </nav>

                <Route path="/create-event/" exact component={CreateEvent} />
                <Route path="/invite-screen/" component={InviteScreen} />
                <Route path="/agenda/" component={Agenda} />
            </div>
        </Router>
    );
}

export default withStyles(styles)(NavBar);