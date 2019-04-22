import React from 'react';
import {withStyles, Typography} from '@material-ui/core';

const styles = {
    container: {
        padding: 15,
        marginLeft: -15,
        marginRight: -15,
        marginTop: -15
    }
};

const UserInfo = ({classes, name, email}) => (
    <div className={classes.container}>
        <Typography variant="h4" className={classes.name}>
            {name}
        </Typography>
        <Typography variant="h6" className={classes.email} color="textSecondary">
            {email}
        </Typography>
    </div>
);

export default withStyles(styles)(UserInfo);