import React from 'react';
import { DataCtx, useData } from '../FlowGrid/DataCtx';
import { SpaceCanvas } from '../Space3D/SpaceCanvas';
import { Ground } from '../Space3D/Ground';
import { MakeNode } from '../FlowGrid/MakeNode';
import * as THREE from 'three';

export const Hud = React.memo(({ style }) => {
  const [data] = useData({ buildings: 'buildingsNodes', camera: 'camera', testData: 'testData' });

  let cellSize = 75;
  let cellSize2 = 75;
  let rows = 6;
  let cols = 6;
  let blockWidth = 35;

  // let camera = React.useMemo(
  //   () => ({
  //     position: [304, 180, 304],
  //     lookAt: [0, 0, 0],
  //     version: 0,
  //   }),
  //   []
  // );

  const [version, setVersion] = React.useReducer(v => v + 1, 0);

  let buildingsNodes = null;

  if (data) {
    buildingsNodes = MakeNode(data.buildings);
  }

  // console.log('done building');
  const dataRef = React.useRef({});

  dataRef.current = data;

  const actions = React.useMemo(
    () => ({
      changeCamera: (position, lookAt, animate = true) => {
        dataRef.current.camera.changeCamera({ position, lookAt, animate });

        // camera.version++;
        // if (position) camera.position = position;
        // else {
        //   delete camera.position;
        // }
        // if (lookAt) camera.lookAt = lookAt;
        // else {
        //   delete camera.lookAt;
        // }

        // if (animate !== undefined) camera.animate = animate;
        // else camera.animate = true;
        // setVersion();
      },
    }),
    []
  );

  let actionsCtx = React.useContext(DataCtx);

  React.useEffect(() => {
    actionsCtx.hud = actions;
    return () => {
      if (actionsCtx.hud === actions) delete actionsCtx.hud;
    };
  }, []);

  window.actions = actions;

  return (
    <div className="main_panel"
      style={{
        ...style,
      }}
      className="frame">
      <div className="sectionTitle">Brivo Site 3D Viewer</div>
      <SpaceCanvas>
        <Ground
          box={{
            sizeX: cols * cellSize + blockWidth / 2,
            sizeZ: rows * cellSize + blockWidth / 2,
          }}
        />
        <group>{buildingsNodes}</group>

        {/* <Floor height={0} opacity={0.1} />
        <Floor height={50} opacity={1} scale={[1.4, 1, 1.4]} />
        <Floor height={100} opacity={0.1} /> */}
      </SpaceCanvas>
    </div>
  );
});

const Floor = ({ height, opacity, scale = [1, 1, 1] }) => {
  const geometry = React.useMemo(() => {
    const geometry = new THREE.Geometry();

    const MakePlane = (face, x1, y1, z1, x2, y2, z2) => {
      let pointsTpl = [
        () => new THREE.Vector3(x1, y1, z2), // 1
        () => new THREE.Vector3(x2, y1, z2), // 0
        () => new THREE.Vector3(x1, y2, z2), // 2
        () => new THREE.Vector3(x2, y2, z2), // 3
        () => new THREE.Vector3(x1, y1, z1), // 4
        () => new THREE.Vector3(x2, y1, z1), // 5
        () => new THREE.Vector3(x1, y2, z1), // 6
        () => new THREE.Vector3(x2, y2, z1), // 7
      ];

      const facesTpl = {
        front: () => [
          new THREE.Face3(getPoint(0, 0), getPoint(3, 3), getPoint(2, 2)), //front
          new THREE.Face3(getPoint(0, 0), getPoint(1, 1), getPoint(3, 3)),
        ],
        left: () => [
          new THREE.Face3(getPoint(4, 2), getPoint(2, 1), getPoint(6, 3)), //left
          new THREE.Face3(getPoint(4, 2), getPoint(0, 0), getPoint(2, 1)),
        ],
        bottom: () => [
          new THREE.Face3(getPoint(4, 2), getPoint(1, 1), getPoint(0, 0)), //bottom
          new THREE.Face3(getPoint(4, 2), getPoint(5, 3), getPoint(1, 1)),
        ],
      };

      let points = {};

      let indexOffset = geometry.vertices.length;

      const getPoint = (tplIndex, index) => {
        if (!points[tplIndex]) points[tplIndex] = pointsTpl[tplIndex]();

        return indexOffset + index;
      };

      let faces = facesTpl[face]();

      geometry.vertices.push(..._.values(points));

      geometry.faces.push(...faces);
    };

    const MakeWall = (x1, y1, z1, x2, y2, z2) => {
      MakePlane('left', x1, y1, z1, x1, y2, z2);
      // MakePlane('left', x2, y1, z1, x2, y2, z2);

      MakePlane('front', x1, y1, z1, x2, y2, z1);
      // MakePlane('front', x1, y1, z2, x2, y2, z2);
    };

    MakePlane('bottom', 0, height + 0, 0, 100, height + 100, 100);

    // MakeWall(0, height + 0, 0, 100, height + 20, 100);

    MakeWall(40, height + 0, 20, 50, height + 10, 50);

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    return geometry;
  }, [height]);

  return (
    <mesh geometry={geometry} scale={scale} receiveShadow={true} castShadow={true}>
      <meshPhongMaterial
        attach="material"
        vertexColors={THREE.FaceColors}
        color="#555"
        side={THREE.DoubleSide}
        shininess={100}
        opacity={opacity}
      />
    </mesh>
  );
};
