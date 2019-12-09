import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { getThemeProps } from '@material-ui/styles';


const useStyles = makeStyles({
  root: {
    
  },
});

export default function ContinuousSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(100);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.callback(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {props.label}
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
        </Grid>
        <Grid item xs>
          <Slider 
          value={props.value} 
          onChange={handleChange} 
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          max ={props.max}
          min={props.min} />
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    </div>
  );
}