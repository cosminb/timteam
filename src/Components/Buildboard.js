import React from 'react';
import { Html } from '@react-three/drei';
import { DeviceIcon } from '../Icons/DeviceIcon';
import { BuildingIcon } from '../Icons/BuildingIcon';

export const Buildboard = ({ index }) => {
  return (
    <Html scaleFactor={300} center={true}>
      <div className="salutare">
        <BuildingIcon />
        SITE {index}
      </div>
    </Html>
  );
};
