import React from 'react';
import { animated } from 'react-spring';
import { useSpring } from 'react-spring/three';
import { GetColor } from '../../index';
import { _ } from '../../jams/common';

export const Card = () => {
  const dRef = React.useRef({ d: 'M 0 0 S 30 30 60 10', points: [] });
  const [version, setVersion] = React.useReducer(v => v + 1, 0);

  const toRef = React.useRef({ from: 'translateX(0px)', to: 'translateX(0px)' });
  const pathRef = React.useRef();

  const add = () => {
    let d = dRef.current;

    const UpdatePath = points => {
      points.push([Math.random() * 30 + 5, Math.random() * 30 + 5]);
      let start = points.shift();
      let path = ['M 0 ' + start[1]];

      let x = 0;
      for (var i in points) {
        let point = points[i];

        let x1 = x;
        let x2 = x + 40;
        x += 80;
        path.push(`S ${x1} ${point[0]} ${x2} ${point[1]}`);
      }

      let d = path.join(' ');

      return d;
    };

    _.each(d.paths, path => {
      path.d = UpdatePath(path.points);
    });
    // d.d = UpdatePath(d.points);
    toRef.current = { from: 'translateX(0px)', to: 'translateX(-80px)' };

    setVersion();
  };

  const spring = useSpring({
    to: { transform: toRef.current.to },
    from: { transform: toRef.current.from },
    config: {
      duration: 20000,
    },
    reset: true,
    onRest: args => {
      if (!args.finished) return;

      window.setTimeout(() => {
        add();
      }, 1);
    },
  });

  React.useEffect(() => {
    let d = dRef.current;

    const GeneratePoints = () => {
      let points = _.times(10, i => [Math.random() * 50, Math.random() * 50]);

      return points;
    };

    d.paths = _.times(1, i => ({ points: GeneratePoints(), d: '', color: 'white' }));

    add();
  }, []);

  let paths = _.map(dRef.current.paths, path => {
    return <path d={path.d} fill="none" stroke={path.color} style={{ transition: 'none' }} />;
  });
  return (
    <div className="card">
      <svg width="100%" height="50px">
        <animated.g style={{ transform: spring.transform, transition: 'none' }}>{paths}</animated.g>
      </svg>
    </div>
  );
};
