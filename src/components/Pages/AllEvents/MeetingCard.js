import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 140,
  },
  CardActions: {
    display: 'flex',
  }
};



function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <div class="title">
          <Typography gutterBottom variant="h6" component="h6">
            {props.meeting_name}
          </Typography>
        </div>
        <div class="details">
          <Typography component="p">
            <div><span>{props.ispending1}</span><span>{props.meeting_earliest}</span></div>
            <div><span>{props.ispending2}</span><span>{props.meeting_latest}</span></div>
          </Typography>
          <Typography gutterBottom component="p">
            {props.location}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Details
        </Button>

      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
