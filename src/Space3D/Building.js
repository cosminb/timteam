import React from 'react';
import { a, useSpring } from 'react-spring/three';
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { DataCtx } from '../FlowGrid/DataCtx';
import { Buildboard } from '../Components/Buildboard';

var BuildingGeometry = new THREE.BoxGeometry(1, 1, 1); // create once and reuse
BuildingGeometry.translate(0.5, 0.5, 0.5);

export const Building = React.memo(
  ({ position, scale, color, opacity, top, hasBilboard, pose, index, issite }) => {
    const spring = useSpring({
      scale,
      position,
      color,
      config: {
        damping: 0.5,
        frequency: 1,
      },
    });

    // console.log('done update sping');

    let actionsCtx = React.useContext(DataCtx);

    const clicked = issite ? () => actionsCtx.run('action_focus_building', { index }) : null;
    const bilboard = hasBilboard && (
      <group position={top} scale={[1, 1, 1]}>
        <Buildboard index={index} />
      </group>
    );
    return (
      <a.group position={spring.position}>
        {bilboard}
        <a.mesh
          scale={spring.scale}
          castShadow={true}
          receiveShadow={true}
          geometry={BuildingGeometry}
          onClick={clicked}>
          {/* <boxBufferGeometry
          attach="geometry"
          args={[1, 1, 1]}
          translate={}
          position={[0.5, 0.5, 0.5]}
        /> */}

          {/* <MeshDistortMaterial
          attach="material"
          distort={1} // Strength, 0 disables the effect (default=1)
          speed={0} // Speed (default=1)
          color={color}
          transparent={true}
          opacity={opacity}
        /> */}

          <a.meshPhongMaterial
            attach="material"
            color={spring.color}
            transparent={true}
            opacity={opacity}
          />
        </a.mesh>
      </a.group>
    );
  }
);
