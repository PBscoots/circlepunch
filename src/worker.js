  
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
        
        let th = Math.PI / 12; //15°
        let be = Math.PI / 12; // 15°
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
              data.circles.push(An);
            }
            if(Bn.x <= maxx && Bn.y <= maxy){
              data.circles.push(Bn);
            }
            if(Cn.x <= maxx && Cn.y <= maxy){
              data.circles.push(Cn);
            }
            if(Dn.x <= maxx && Dn.y <= maxy){
              data.circles.push(Dn);
            }    
          }
        }   
      }

      data.performance = performance.now() - t0;
      let circleArea = data.circles.length * Math.PI * (dimensions.radius ^ 2);
      data.efficiency = circleArea / (dimensions.x * dimensions.y - circleArea);
  
      postMessage(data);
    });
  };