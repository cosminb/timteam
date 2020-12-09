import React from 'react';
import { _ } from '../../jams/common';

export const Card2 = () => {
  let ref = React.useRef();

  React.useEffect(() => {
    let canvas = ref.current,
      ctx = canvas.getContext('2d');

    let w = 298;
    let h = 100;
    let t = 0;

    let params = _.times(10, i => [Math.random() * 40 + 4, Math.random() * 10 + 1]);

    params[0][1] = 2;

    let hue = Math.random() * 360;

    const paint = () => {
      t++;

      if (t % 30 !== 0) return;
      var imageData = ctx.getImageData(1, 0, w - 1, h);
      // ctx.clearRect(w - 1, 0, w, h);
      ctx.putImageData(imageData, 0, 0);

      ctx.fillStyle = 'red';

      _.each(params, param => {
        ctx.beginPath();
        ctx.strokeStyle = `hsl( ${hue},${Math.random() * 50 + 30}%, ${Math.random() * 80 + 20}% )`;
        // ctx.strokeStyle = `hsl( ${hue},50%, 40% )`;
        ctx.moveTo(w - 1, Math.floor((Math.cos((t - 1) / param[0]) * h) / param[1] + h / 2));

        ctx.lineTo(w, Math.floor((Math.cos(t / param[0]) * h) / param[1] + h / 2));

        ctx.stroke();

        // ctx.fillRect(
        //   w - 1,
        //   (Math.sin(t / param[0]) * Math.cos(t / param[0]) * h) / param[1] + h / 2,
        //   1,
        //   1
        // );
      });
      // ctx.fillRect(w - 1, (Math.sin(t / 20) * h) / 4 + h / 2, 1, 1);
      // ctx.fillRect(w - 1, (Math.sin(t / 40) * h) / 3.15 + h / 2, 1, 1);
    };

    let stop = false;
    const run = t => {
      if (stop) return;

      paint();

      requestAnimationFrame(run);
    };
    // let timer = window.setInterval(paint, 20);
    run();

    return () => (stop = true);
  }, []);
  return (
    <div className="card">
      <canvas ref={ref} width="300" height={90} />
    </div>
  );
};
