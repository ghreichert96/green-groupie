import React from 'react';
import { withStyles } from '@material-ui/core';
import GoogleLogo from '../../../assets/img/google-logo.png';

const styles = {
    logo: {
        width: 24,
        height: 24
    }
};

const AccountIcon = ({ classes, type }) => {
    switch(type) {
        case "Google": {
            return (<img src={GoogleLogo} className={classes.logo} />);
        }
        default: {
            return "";
        }
    }
};

export default withStyles(styles)(AccountIcon);