import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import ContinuousSlider from './Slider.js';
import Canvas from './Canvas.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  
  const [canvasWidth, setWidth] = useState(500);
  const [canvasHeight, setHeight] = useState(500);
  const [circleRadius, setRadius] = useState(30);
  const [theta, setTheta] = useState(0);
  const [beta, setBeta] = useState(0);
  const [metrics, setMetrics] = useState({});

  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container direction='rows'>
          <Grid container xs={2} spacing={3} justify = 'center' direction='column'>
            <Grid item >
              <Paper className={classes.paper}>
                <div>
                  Estimates: FittingX: {Math.floor(canvasWidth / (circleRadius *2))} Fitting Y: {Math.floor(canvasHeight / (circleRadius *2))}
                </div>
                <div>
                  # of circles: {metrics.numCircles}
                </div>
                <div>
                  Performance time (ms): {metrics.performance}
                </div>
                <div>
                  Efficiency: (Area circles/Area square): <strong>{metrics.efficiency * 100}</strong>
                </div>
              </Paper>
            </Grid>
            <Grid item >
              <Paper className={classes.paper}>
                <ContinuousSlider max={1250} min={50} callback={setWidth} label ='X distance'/>
              </Paper>
            </Grid>
            <Grid item >
              <Paper className={classes.paper}>
                <ContinuousSlider max={675} min={50} callback={setHeight} label = 'Y Distance'/> 
              </Paper>
            </Grid>
            <Grid item >
              <Paper className={classes.paper}>
                <ContinuousSlider  max={100} min={5} callback={setRadius} label = 'Radius'/>
              </Paper>
            </Grid>
          </Grid>
          <Grid container xs={10} justify='center'>
            <Canvas 
              width={canvasWidth} 
              height={canvasHeight} 
              windowwidth={1250}
              windowheight={675}
              radius={circleRadius} 
              setMetrics={setMetrics}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;

