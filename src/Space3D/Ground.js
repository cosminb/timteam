import React from 'react';

export const Ground = ({ box }) => {
  return (
    <mesh position={[0, 0, 0]} scale={[box.sizeX, 1, box.sizeZ]} receiveShadow={true}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#111" receiveShadow={true} />
    </mesh>
  );
};
