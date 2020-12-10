import React from 'react';
import { animated } from 'react-spring';
import { useSprings } from 'react-spring/three';
import { GetColor } from '../../index';
import { _ } from '../../jams/common';

export const Card3 = () => {
  const rows = 10;
  const cols = 10;

  let cellSize = 30;
  let blockSize = 20;

  const [springs, set, stop] = useSprings(100, index => ({
    opacity: 0.9,
    fill: Math.random() < 0.05 ? 'red' : Math.random() < 0.4 ? '#14679f' : 'grey',

    config: {
      frequency: 6,
      damping: 1,
    },
  }));

  /* React.useEffect(() => {
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
  }, []); */

  React.useEffect(() => {
    let timer = window.setInterval(() => {
      set(index => ({
        fill: Math.random() < 0.07 ? 'red' : Math.random() < 0.4 ? '#14679f' : 'grey',
        config: {
          frequency: 2,
          damping: 1,
        },
      }));
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  let nodes = _.times(100, i => {
    let x = Math.floor(i / 10) * cellSize;
    let y = (i % 10) * cellSize;
    return <animated.rect x={x} y={y} width={blockSize} height={blockSize} style={springs[i]} />;
  });
  return (
    <>
      <div className="sectionTitle">Sites</div>
      <div className="card">
        <svg width="100%" height="300px">
          <g style={{ translate: '25px 25px' }}>{nodes}</g>
        </svg>
      </div>
    </>
  );
};
