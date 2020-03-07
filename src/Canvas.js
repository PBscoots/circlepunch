import React from 'react'
import Button from '@material-ui/core/Button';
import worker from "./worker.js";
import WebWorker from "./workerSetup";

class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ctx: null,
            // circles: []
        }
        this.randomSpot = this.randomSpot.bind(this);
        this.uniformSpots = this.uniformSpots.bind(this);
        this.analyticSpots = this.analyticSpots.bind(this);
        this.drawAll = this.drawAll.bind(this);
    }
    componentDidMount() {
        this.worker = new WebWorker(worker);
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const reqAniFrame = requestAnimationFrame;
        this.setState({
            ctx: ctx
        });
        this.worker.addEventListener('message', e => {
            let data = e.data;
            this.props.setMetrics({
                performance: data.performance,
                efficiency: data.efficiency,
                numCircles: data.circles.length
            })
            // requestAnimationFrame(this.drawAll(data));
            this.drawAll(data);
            // this.clearCanvas(this.state.ctx,this.props.width,this.props.height);
            // data.circles.forEach(circle => {
            //     this.drawCircle(this.state.ctx,circle.x, circle.y, this.props.radius);
            // });
            
        });
    }
    componentDidUpdate(prevProps){
        if(prevProps.width !== this.props.width || prevProps.height !== this.props.height || prevProps.radius !== this.props.radius){
            
            this.analyticSpots();
        }
        
    }

    randomSpot(){
        let dimensions = {
            type: 'random',
            x:this.props.width, 
            y:this.props.height, 
            radius:this.props.radius
        }
        this.worker.postMessage(dimensions);
    }
    uniformSpots(){
        let dimensions = {
            type: 'uniform',
            x:this.props.width, 
            y:this.props.height, 
            radius:this.props.radius
        }
        this.worker.postMessage(dimensions);
    }
    analyticSpots(){
        let dimensions = {
            type: 'analytic',
            x:this.props.width, 
            y:this.props.height, 
            radius:this.props.radius
        }
        this.worker.postMessage(dimensions);
    }
    drawAll(data){
        this.clearCanvas(this.state.ctx,this.props.windowwidth,this.props.windowheight);
        this.drawRect(this.state.ctx, 0, 0, this.props.width, this.props.height);
        data.circles.forEach(circle => {
            this.drawCircle(this.state.ctx,circle.x, circle.y, this.props.radius);
        });
    }
    clearCanvas(ctx,x ,y){
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0,0,x,y);
    }
    drawCircle(ctx,x,y,r){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF000F";
        ctx.fill();
        ctx.stroke();
    }
    drawRect(ctx,x,y,w,h){
        ctx.fillStyle= '#e5eaf3';
        ctx.fillRect(x,y,w,h);
    }
    
    render() {
        return(
          <div>
            <Button onClick={this.randomSpot}>
                Random
            </Button>
            <Button onClick={this.uniformSpots}>
                Uniform
            </Button>
            <Button onClick={this.analyticSpots}>
                Geometric Sweep
            </Button>
            <canvas ref="canvas" width={this.props.windowwidth} height={this.props.windowheight} style={{border:'2px solid black'}} />
          </div>
        )
      }
    }
    export default Canvas
