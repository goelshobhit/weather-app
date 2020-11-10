import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ item }) {
  const classes = useStyles();
  const {
    weather,
    main: { pressure, temp_max, temp_min },
    wind: { speed, deg },
  } = item;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://cache.desktopnexus.com/thumbseg/1422/1422421-bigthumbnail.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {weather[0].description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <ul>
              <li>Min Temp: {temp_min}</li>
              <li>Max Temp: {temp_max}</li>
              <li>Pressure: {pressure}</li>
            </ul>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Wind Speed: {speed}
        </Button>
        <Button size="small" color="primary">
          Wind Degree: {deg}
        </Button>
      </CardActions>
    </Card>
  );
}
