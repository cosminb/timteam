import React from 'react';
import _ from 'lodash';
import { DataCtx } from '../FlowGrid/DataCtx';
import { useSpring, a } from 'react-spring';

export const InfoPanel = ({ style }) => {
  const animatedStyle = useSpring({
    ...style,
    config: {
      frequency: 2,
      damping: 0.9,
    },
  });

  const actionsCtx = React.useContext(DataCtx);

  const handleClose = () => {
    actionsCtx.run('action_overview', {});
  };

  return (
    <a.div style={animatedStyle} className="infopanel">
      <div>
        INFO panel
        <button onClick={handleClose}>Close</button>
      </div>
    </a.div>
  );
};
