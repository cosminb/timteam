import React from 'react';
import _ from 'lodash';
import { a, useSprings } from 'react-spring';

export const FloorsGroup = ({}) => {
  const [activeFloor, setActiveFloor] = React.useState(2);

  let [floorsData] = useSprings(
    5,
    i => {
      let offset = 0;
      if (i < activeFloor) offset = -80;
      else if (i > activeFloor) offset = +80;

      return {
        y: 160 + i * 30 + offset,

        fill: i == activeFloor ? 'white' : '#ddd',
        opacity: i == activeFloor ? 1 : 0.2,
        scale: i == activeFloor ? 1.5 : 1,
      };
    },
    [activeFloor]
  );

  let nodes = _.map(floorsData, (fs, i) => {
    const click = () => {
      setActiveFloor(i);
    };
    return (
      <a.rect
        onClick={click}
        className="floorSvg"
        x={40}
        y={fs.y}
        width="140"
        height="140"
        fill={fs.fill}
        style={{
          zIndex: 5 - i,
        }}
        scale={fs.scale}
        opacity={fs.opacity}
      />
    );
  });

  nodes.reverse();

  return (
    <div className="floorsGroup">
      <svg height="100%" width="100%">
        <g style={{ perspective: 300 }}>{nodes}</g>
      </svg>
    </div>
  );
};
