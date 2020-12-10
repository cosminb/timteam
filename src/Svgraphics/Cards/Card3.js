import React from 'react';
import { animated } from 'react-spring';
import { useSprings } from 'react-spring/three';
import { DataCtx, useData } from '../../FlowGrid/DataCtx';
import { GetColor } from '../../index';
import { _ } from '../../jams/common';


export const Card3 = () => {
  const [data] = useData({ buildings: 'buildings', camera: 'camera', testData: 'testData' });
  console.log("data", data);
  const _ = require('lodash');

  const rows = 10;
  const cols = 10;

  let cellSize = 30;
  let blockSize = 20;

  const [springs, set, stop] = useSprings(100, index => ({}));

  React.useEffect(() => {
    if (!_.isEmpty(data)) {
      set(index => {
        return ({
          opacity: 0.9,
          fill: setSquareColor(data.buildings.all[index]),
          config: {
            frequency: 2,
            damping: 1,
          },
        })
      });
    }
  }, [data]);

  const setSquareColor = (building) => {
    let colorItem = '';

      if(building.hasError) {
        colorItem = '#800000';
      } else if(!building.issite) {
        colorItem = '#333'
      } else {
        colorItem = '#003d99'
      }
    return colorItem;
  };

  let nodes = _.times(100, i => {
    let y = Math.floor(i / 10) * cellSize;
    let x = (i % 10) * cellSize;
    return <animated.rect x={x} y={y} width={blockSize} height={blockSize} style={springs[i]} />;
  });
  return (
    <>

      <div className="card">
        <div className="sectionTitle">Sites</div>
        <svg width="100%" height="300px">
          <g style={{ translate: '25px 25px' }}>{nodes}</g>
        </svg>
      </div>
    </>
  );
};
