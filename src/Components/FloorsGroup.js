import React from 'react';
import _ from 'lodash';
import { a, useSprings } from 'react-spring';

export const FloorsGroup = ({activeFloor, setActiveFloor, nodes}) => {

  return (
    <div className="floorsGroup">
      <svg height="100%" width="100%">
        <g style={{ perspective: 300 }}>{nodes}</g>
      </svg>
    </div>
  );
};
