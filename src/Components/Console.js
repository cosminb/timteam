import React from 'react';
import _ from 'lodash';
import { DataCtx } from '../FlowGrid/DataCtx';

export const Console = ({ style }) => {
  let options = [
    { position: [123, 123, 123], lookAt: [0, 0, 0] },
    { position: [70, 20, 70], lookAt: [0, 0, 0] },
    { position: [70, 20, 171], lookAt: [30, -20, 40] },
    { position: [0, 500, 0], lookAt: [0, 0, 0] },
    { position: [-70, 20, 171], lookAt: [30, -20, 40] },
    { position: [0, 0, 100], lookAt: [0, 0, 0] },
  ];

  let actionsCtx = React.useContext(DataCtx);

  let nodes = _.map(options, op => {
    const go = () => actionsCtx.hud.changeCamera(op.position, op.lookAt);
    return <div onClick={go}> {JSON.stringify(op)}</div>;
  });
  return (
    <div style={style}>
      {nodes}
      <input />
    </div>
  );
};
