import React from 'react';
import { animated } from 'react-spring';
import { useSprings } from 'react-spring/three';
import { GetColor } from '../../index';
import { _ } from '../../jams/common';

export const Card4 = () => {
  const rows = 3;
  const cols = 10;

  let cellSize = 25;
  let blockSize = 10;
  let height = 6;
  let cellHeight = 15;

  const makeItem = i => ({
    x: 0,

    y: i * cellHeight,

    width: Math.floor(Math.random() * 100) + '%',
    height: height,
    opacity: 0.9,
    //    opacity: Math.min(0.8, Math.random() + 0.2),

    fill: Math.random() < 0.05 ? 'green' : '#14679f',

    config: {
      frequency: 2,
      damping: Math.random() < 0.1 ? 0.31 : 0.9,
    },
  });

  const [springs, set, stop] = useSprings(5, makeItem);

  React.useEffect(() => {
    let timer = window.setInterval(() => {
      set(makeItem);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  let nodes = _.times(5, i => {
    return <animated.rect height={height} style={springs[i]} />;
  });

  return (
    <>
      <div className="sectionTitle">Devices per Floor</div>
      <div className="card">
        <svg width="100%" height="115px">
          <g style={{ translate: '25px 25px' }}>{nodes}</g>
        </svg>
      </div>
    </>
  );
};
