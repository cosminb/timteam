import React, { useEffect } from 'react';
import { DataCtx } from '../FlowGrid/DataCtx';
import { useSpring,useSprings, a } from 'react-spring';
import { Charts } from './Charts';
import { FloorsGroup } from './FloorsGroup';
import { Details } from './Details';
import _ from 'lodash';

export const InfoPanel = ({ style, isOpen }) => {
  const animatedStyle = useSpring({
    ...style,
    config: {
      frequency: 2,
      damping: 0.9,
    },
  });

  const actionsCtx = React.useContext(DataCtx);

  const handleClose = () => {
    actionsCtx.run('action_overview', {});
  };

  const [activeFloor, setActiveFloor] = React.useState(4);

  useEffect(() => {
    setActiveFloor(4);
  }, [isOpen]);


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


  let floorName = "";
  switch (activeFloor) {
    case '4':
      floorName = "Ground Floor"
      break;
    case '3':
      floorName = "First Floor"
      break;
    case '2':
      floorName = "Second Floor"
      break;
    case '1':
      floorName = "Third Floor"
      break;
    case '0':
      floorName = "Forth Floor"
      break;
    default:
      floorName = "Ground Floor"
  };

  return (
    <a.div style={animatedStyle} className="infopanel">
      <button onClick={handleClose} className="closeButton">
        Close
      </button>
      {isOpen && (
        <>
          <FloorsGroup
            activeFloor={activeFloor}
            setActiveFloor={setActiveFloor}
            nodes={nodes}
          />
          <Details 
            activeFloor={activeFloor}
            setActiveFloor={setActiveFloor}
            floorName={floorName}
          />
          {/* <Charts /> */}
        </>
      )}
    </a.div>
  );
};
