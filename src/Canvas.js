import React from 'react'
import Button from '@material-ui/core/Button';
import worker from "./worker.js";
import WebWorker from "./workerSetup";

class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ctx: null,
            circles: []
        }
        this.randomSpot = this.randomSpot.bind(this);
        this.uniformSpots = this.uniformSpots.bind(this);
    }
    componentDidMount() {
        this.worker = new WebWorker(worker);
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.setState({
            ctx: ctx
        });
    }
    componentDidUpdate(){
        //this.drawCircle(this.state.ctx,this.props.radius,this.props.radius, this.props.radius);

    }
    randomSpot(){
        let dimensions = {
            type: 'random',
            x:this.props.width, 
            y:this.props.height, 
            radius:this.props.radius
        }
        this.worker.postMessage(dimensions);
        
        this.worker.addEventListener('message', e => {
            let circles = e.data;
            this.setState({
                circles: [... e.data]
            })
            circles.forEach(circle => {
                this.drawCircle(this.state.ctx,circle.x, circle.y, this.props.radius);
            });
        });
    }
    uniformSpots(){
        let dimensions = {
            type: 'uniform',
            x:this.props.width, 
            y:this.props.height, 
            radius:this.props.radius
        }
        this.worker.postMessage(dimensions);
        
        this.worker.addEventListener('message', e => {
            let circles = e.data;
            this.setState({
                circles: [... e.data]
            })
            circles.forEach(circle => {
                this.drawCircle(this.state.ctx,circle.x, circle.y, this.props.radius);
            });
        });
    }
    drawCircle(ctx,x,y,r){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF000F";
        ctx.fill();
        ctx.stroke();
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
            <canvas ref="canvas" width={this.props.width} height={this.props.height} style={{border:'2px solid black'}} />
          </div>
        )
      }
    }
    export default Canvas
