import React from 'react';
import { animated } from 'react-spring';
import { useSprings } from 'react-spring/three';
import { GetColor } from '../../index';
import { _ } from '../../jams/common';

export const Card3 = () => {
  const rows = 3;
  const cols = 10;

  let cellSize = 25;
  let blockSize = 10;

  const [springs, set, stop] = useSprings(30, index => ({
    opacity: Math.random(),
    fill: Math.random() < 0.1 ? 'orange' : '#007abc',

    config: {
      frequency: 6,
      damping: 1,
    },
  }));

  React.useEffect(() => {
    let timer = window.setInterval(() => {
      set(index => ({
        opacity: Math.random(),
        fill: Math.random() < 0.1 ? 'orange' : '#007abc',
        config: {
          frequency: 2,
          damping: 1,
        },
      }));
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  let nodes = _.times(30, i => {
    let x = Math.floor(i / 3) * cellSize;
    let y = (i % 3) * cellSize;
    return <animated.rect x={x} y={y} width={blockSize} height={blockSize} style={springs[i]} />;
  });
  return (
    <div className="card">
      <svg width="100%" height="100px">
        <g style={{ translate: '25px 25px' }}>{nodes}</g>
      </svg>
    </div>
  );
};
