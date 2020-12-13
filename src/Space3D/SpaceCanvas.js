import React from 'react';
import { Canvas, extend } from 'react-three-fiber';
// import * as THREE from 'three';
import { _ } from '../jams/common';
import { DataCtx } from '../FlowGrid/DataCtx';
import { useContextBridge } from '@react-three/drei';
import { CameraRotation } from './CameraRotation';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export const SpaceCanvas = ({ children }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const ContextBridge = useContextBridge(DataCtx);

  return (
    <Canvas
      pixelRatio={1} //{Math.min(2, isMobile ? window.devicePixelRatio : 1)}
      camera={{ fov: 45, far: 10000, position: [0, 0, 0], rotation: [0, 0, 0] }}
      onCreated={({ gl }) => {
        gl.setClearColor('#020207', 0.1);
        // document.body.appendChild(ARButton.createButton(gl));
      }}
      shadowMap={{ enabled: false }}
      invalidateFrameloop>
      <ContextBridge>
        <pointLight
          distance={100}
          intensity={4}
          color="white"
          position={[5, 150, 20]}
          castShadow={true}
        />
        <pointLight
          // castShadow={true}
          distance={1000}
          intensity={4}
          color="white"
          position={[0, 150, 20]}
        />
        <pointLight
          // castShadow={true}
          distance={1000}
          intensity={1}
          color="white"
          position={[5, 150, -20]}
        />
        <pointLight
          // castShadow={true}
          distance={1000}
          intensity={1}
          color="white"
          position={[0, 150, 0]}
        />
        <ambientLight color="white" intensity={3} />

        <CameraRotation />
        {children}
      </ContextBridge>
    </Canvas>
  );
};
