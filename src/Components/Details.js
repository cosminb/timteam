import React, { useEffect } from 'react';
import _ from 'lodash';
import { a, useSprings } from 'react-spring';

export const Details = ({activeFloor, setActiveFloor, floorName}) => {

  return (
    <div style={{ marginTop: '50px' }}>
      {floorName}
    </div>
  );
};
