

export default () => {
  
    self.addEventListener('message', e => { //eslint-disable-line no-restricted-globals
      // eslint-disable-line no-restricted-globals

      if (!e) return;
      let dimensions = e.data;

      let circles = [];
      let data = {
        performance: null,
        efficiency: null,
        circles: [],
      }
      let r = dimensions.radius;
      let minx = dimensions.radius;
      let maxx = dimensions.x - dimensions.radius;
      let miny = dimensions.radius;
      let maxy = dimensions.y - dimensions.radius;

      let t0 = performance.now();

      if (dimensions.type === 'random') {
        for (let i = 0; i < 10000; i++) {
          let circle = {
            x: null,
            y: null,
          };
          circle.x = Math.floor(Math.random() * (maxx - minx)) + minx;
          circle.y = Math.floor(Math.random() * (maxy - miny)) + miny;
          data.circles.push(circle);
        }
      } else if(dimensions.type === 'uniform'){
        let xFit = Math.floor(dimensions.x / (dimensions.radius * 2));
        let yFit = Math.floor(dimensions.y / (dimensions.radius * 2));
        for (let y_i = 0; y_i < yFit; y_i++) {
          for (let x_i = 0; x_i < xFit; x_i++) {
              data.circles.push({
                x: dimensions.radius + x_i * 2 * dimensions.radius,
                y: dimensions.radius + y_i * 2 * dimensions.radius
              })          
          }    
               
        }
        
      } else if(dimensions.type === 'analytic'){

        let maxAngle = Math.PI / 6 //30°;
        let resSteps = 100;
        let temp_data = {
          th: null,
          be: null,
        }
        // sweep through all angles between 0 and 30° always ensuring the sum of the two angles is not more than 30°
        for (let th_i = 0; th_i < resSteps; th_i++) {
          for (let be_i = 0; be_i < resSteps; be_i++) {
            let currTh = maxAngle * th_i / resSteps
            let currBe = maxAngle * be_i / resSteps
            if(maxAngle < currTh + currBe){
              continue
            }
            let circles = createSet(currTh, currBe, dimensions);
            if (circles.length > data.circles.length){
              data.circles = circles;
              temp_data.th = currTh;
              temp_data.be = currBe;
              console.log("found a better one with #" + circles.length);
            }
          }
        } 
      }

      data.performance = performance.now() - t0;
      let circleArea = data.circles.length * Math.PI * (dimensions.radius ^ 2);
      data.efficiency = circleArea / (dimensions.x * dimensions.y - circleArea);
  
      postMessage(data);
    });

    function createSet(th, be, dimensions){
      let circles = [];
      let r = dimensions.radius;
      let minx = dimensions.radius;
      let maxx = dimensions.x - dimensions.radius;
      let miny = dimensions.radius;
      let maxy = dimensions.y - dimensions.radius;
      let cosTh = 2 * r * Math.cos(th);
      let sinTh = 2 * r * Math.sin(th);
      let cosBe = 2 * r * Math.cos(be);
      let sinBe = 2 * r * Math.sin(be);
      let xFit = Math.floor(dimensions.x / (dimensions.radius * 2));
      let yFit = Math.floor(dimensions.y / (dimensions.radius * 2));
      for (let y_i = 0; y_i < yFit; y_i++) {
        for (let x_i = 0; x_i < xFit; x_i++) {
          let An, Bn, Cn, Dn;
          An = Bn = Cn = Dn = {x: null, y: null}
          let shiftLenX = 2 * x_i * cosTh;
          let shiftLenY = 2 * y_i * cosBe;
          An = {
            x: r + shiftLenX,
            y: r + shiftLenY,
          }
          Bn = {
            x: r + cosTh + shiftLenX,
            y: r + sinTh + shiftLenY
          }
          Cn = {
            x: r + sinBe + shiftLenX,
            y: r + cosBe + shiftLenY
          }
          Dn = {
            x: r + cosTh + sinBe + shiftLenX,
            y: r + cosBe + sinTh + shiftLenY
          }
          if(An.x <= maxx && An.y <= maxy){
            circles.push(An);
          }
          if(Bn.x <= maxx && Bn.y <= maxy){
            circles.push(Bn);
          }
          if(Cn.x <= maxx && Cn.y <= maxy){
            circles.push(Cn);
          }
          if(Dn.x <= maxx && Dn.y <= maxy){
            circles.push(Dn);
          }    
        }
      }
      return circles;

    }

  };

