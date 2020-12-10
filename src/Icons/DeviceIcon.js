import React from 'react';
import { pathSegments } from './paths100.js';

const getRandomIndex = arr => {
  return Math.floor(Math.random() * arr.length);
};
const getRandomItem = arr => {
  return arr[getRandomIndex(arr)];
};

const getSegments = () => {
  let d = getRandomItem(pathSegments);
  d = Array.from(d.matchAll(/[A-Za-z]+[^A-Za-z]+/g)).map(i => i[0]);

  return d;
};

const getIconPaths = () => {
  let d = getSegments();
  while (d.length < 100) {
    let d2 = getSegments();

    let start1 = getRandomIndex(d);
    // let start2 = getRandomIndex(d2);
    // let end2 = getRandomIndex(d2);
    d.splice(start1, 0, ...d2);
  }

  d = d.join('') + 'z';
  if (d.charAt(0) != 'M') d = 'M' + d.substr(1);

  return d;
};

export const DeviceIcon = () => {
  let d = React.useMemo(() => getIconPaths(), []);
  return (
    <svg width="20" height="20" className="iconFrame" viewBox="0 0 58.153 58.153">
      <path
        d={d}
        stroke="#007abc95"
        fill="#007abc55"
        fillRule="nonzero"
        className="icon"
        style={{}}
      />
    </svg>
  );
};
