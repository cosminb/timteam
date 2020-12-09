import React from 'react';
import { _ } from '../jams/common';
import { useDataBubbles } from './DataCtx';

export const DataHub = ({ spec, subs }) => {
  // return React.createElement( spec.component, { ...spec.props }, subs   )
  useDataBubbles(spec.data);

  let node;
  let props = { ...spec.props, children: subs };

  if (_.isFunction(spec.component)) node = spec.component(props);
  else if (_.isString(spec.component)) node = React.createElement(spec.component, props);

  return node;
};
