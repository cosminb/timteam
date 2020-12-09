import React from 'react';
import { Html } from '@react-three/drei';
import { DeviceIcon } from '../Icons/DeviceIcon';

export const Buildboard = ({ index }) => {
  return (
    <Html scaleFactor={300} center={true}>
      <div className="salutare">
        <DeviceIcon />
        SITE {index}
      </div>
    </Html>
  );
};
