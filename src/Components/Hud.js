import React from 'react';
import { DataCtx, useData } from '../FlowGrid/DataCtx';
import { SpaceCanvas } from '../Space3D/SpaceCanvas';
import { Ground } from '../Space3D/Ground';
import { MakeNode } from '../FlowGrid/MakeNode';

export const Hud = React.memo(({ style }) => {
  const [data] = useData({ buildings: 'buildingsNodes', camera: 'camera', testData: 'testData' });

  console.log(data.testData);

  let cellSize = 55;
  let cellSize2 = 75;
  let rows = 10;
  let cols = 10;
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
    <div
      style={{
        borderRadius: 10,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        ...style,
      }}
      className="frame">
      <SpaceCanvas>
        <Ground
          box={{
            sizeX: cols * cellSize + blockWidth / 2,
            sizeZ: rows * cellSize + blockWidth / 2,
          }}
        />
        <group>{buildingsNodes}</group>
      </SpaceCanvas>
    </div>
  );
});
