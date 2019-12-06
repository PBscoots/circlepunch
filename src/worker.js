  
export default () => {
    self.addEventListener('message', e => { //eslint-disable-line no-restricted-globals
      // eslint-disable-line no-restricted-globals
      if (!e) return;
      let dimensions = e.data;

      let circles = [];
      let minx = dimensions.radius;
      let maxx = dimensions.x - dimensions.radius;
      let miny = dimensions.radius;
      let maxy = dimensions.y - dimensions.radius;

      if (dimensions.type === 'random') {
        for (let i = 0; i < 10000; i++) {
          let circle = {
            x: null,
            y: null,
          };
          circle.x = Math.floor(Math.random() * (maxx - minx)) + minx;
          circle.y = Math.floor(Math.random() * (maxy - miny)) + miny;
          circles.push(circle);
        }
      } else if(dimensions.type === 'uniform'){
        let xFit = Math.floor(dimensions.x / (dimensions.radius * 2));
        let yFit = Math.floor(dimensions.y / (dimensions.radius * 2));
        for (let y_i = 0; y_i < yFit; y_i++) {
          for (let x_i = 0; x_i < xFit; x_i++) {
              circles.push({
                x: dimensions.radius + x_i * 2 * dimensions.radius,
                y: dimensions.radius + y_i * 2 * dimensions.radius
              })          
          }          
        }
      }
      
  
      postMessage(circles);
    });
  };