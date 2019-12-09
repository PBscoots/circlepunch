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
  const [metrics, setMetrics] = useState({});

  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container spacing={3} justify = 'center'>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <div>
                Estimates: FittingX: {Math.floor(canvasWidth / (circleRadius *2))} Fitting Y: {Math.floor(canvasHeight / (circleRadius *2))}
              </div>
              <div>
                # of circles: {metrics.numCircles}
              </div>
              <div>
                Efficiency: (Area square/Area circles): {metrics.efficiency}
              </div>
              <div>
                Performance time (ms): {metrics.performance}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <ContinuousSlider max={1700} callback={setWidth} label ='X distance'/>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <ContinuousSlider max={900} callback={setHeight} label = 'Y Distance'/> 
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <ContinuousSlider max={100} callback={setRadius} label = 'Radius'/>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing= {12} justify='center'>
          <Canvas 
            width={canvasWidth} 
            height={canvasHeight} 
            radius={circleRadius} 
            setMetrics={setMetrics}/>
        </Grid>
      </div>
    </div>
  );
}

export default App;

