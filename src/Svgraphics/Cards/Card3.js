import React from 'react';
import { animated } from 'react-spring';
import { useSprings } from 'react-spring/three';
import { DataCtx, useData } from '../../FlowGrid/DataCtx';
import { GetColor } from '../../index';
import { _ } from '../../jams/common';

export const Card3 = () => {
  const [data] = useData({ buildings: 'buildings' });
  const _ = require('lodash');

  const rows = 6;
  const cols = 6;

  let cellSize = 40;
  let blockSize = 35;

  const [springs, set, stop] = useSprings(rows * cols, index => ({}));

  React.useEffect(() => {
    if (!_.isEmpty(data)) {
      set(index => {
        return {
          opacity: data.buildings.all[index].issite ? 1 : 0.6,
          fill: setSquareColor(data.buildings.all[index]),
          config: {
            frequency: 0.5,
            damping: 1,
          },
        };
      });
    }
  }, [data]);

  let actionsCtx = React.useContext(DataCtx);

  const setSquareColor = building => {
    let colorItem = '';

    if (building.hasError) {
      colorItem = '#800000';
    } else if (!building.issite) {
      colorItem = '#333';
    } else {
      colorItem = '#003d99';
    }
    return colorItem;
  };

  let nodes = _.times(rows * cols, i => {
    let y = Math.floor(i / cols) * cellSize;
    let x = (i % cols) * cellSize;
    let isSite = false;
    if (!_.isEmpty(data)) {
      isSite = data.buildings.all[i].issite;
    }
    const clicked = isSite ? () => actionsCtx.run('action_focus_building', { index: i }) : null;
    return (
      <animated.rect
        x={x}
        y={y}
        width={blockSize}
        height={blockSize}
        style={springs[i]}
        onClick={clicked}
      />
    );
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
