import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, withStyles, Paper } from '@material-ui/core';

const styles = {
    paper : {
        vAlign: "top"
    }

};

const MeetingCard =  ({meetingName, startTime, endTime, location, noAvailable, totalPeople, date }, props) => {
    const { classes } = props;

    return (
        <table>
            <tr>
                <td>
                    <Paper className={classes.paper} elevation={0}>
                        <Typography >
                            {date}
                        </Typography>
                    </Paper>
                </td>
                <td>
                    <Card >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {meetingName}
                            </Typography>
                            <Typography>
                                {startTime} - {endTime}
                            </Typography>
                            <Typography component="p">
                                {noAvailable} out of {totalPeople} people available
                            </Typography>
                            <Typography  color="textSecondary">
                                {location}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Update Schedule</Button>
                        </CardActions>
                    </Card>
                </td>
            </tr>
        </table>
        )


};


export default withStyles(styles)(MeetingCard);