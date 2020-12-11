import React from 'react';
import { DataCtx } from '../FlowGrid/DataCtx';
import { useSpring, a } from 'react-spring';
import { Charts } from './Charts';
import { FloorsGroup } from './FloorsGroup';

export const InfoPanel = ({ style, isOpen }) => {
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
      <button onClick={handleClose} className="closeButton">
        Close
      </button>
      {isOpen && (
        <>
          <FloorsGroup />
          <Charts />
        </>
      )}
    </a.div>
  );
};
