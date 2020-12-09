import React from 'react';
import { _ } from '../jams/common';
import { DataHub } from './DataHub';

export const MakeNode = (spec, key) => {
  if (!spec) return null;

  if (spec.component) {
    if (spec.hidden) return null;
    let subs;
    if (spec.subs) subs = _.map(spec.subs, MakeNode);

    if (!subs || subs.length === 0) subs = null;

    if (spec.data) {
      return React.createElement(DataHub, { spec, key, subs });
    } else return React.createElement(spec.component, { ...spec.props, key }, subs);
  } else if (spec.subs) {
    return _.map(spec.subs, MakeNode);
  } else return _.map(spec, MakeNode);
};
