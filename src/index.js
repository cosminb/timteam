import React from 'react';
import ReactDOM from 'react-dom';
import { useFrame, extend, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { BoxGeometry } from 'three';
import './style.scss';
import { Controller } from 'react-spring';

import { DataLayer } from './FlowGrid/DataCtx';
import { Card2 } from './Svgraphics/Cards/Card2';
import { useSpring } from 'react-spring/three';
import { MakeNode } from './FlowGrid/MakeNode';
import { Bg } from './Svgraphics/Bg';
import { specTree } from './Specs/specTree';

const App = () => {
  console.log('app');

  let [version, setVersion] = React.useReducer(v => v + 1, 0);

  //tinker from the console
  window.specTree = specTree;
  window.changeIT = () => {
    setVersion();
  };

  let node = MakeNode(specTree);
  console.log(specTree);

  const data = React.useMemo(() => {
    let data = new DataLayer();
    return data;
  }, []);

  let svg = <Bg />;

  node = [svg, node];
  return data.wrapper(node);
};

window.THREE = THREE;

// if ('webkitSpeechRecognition' in window) {
//   window.recognition = new webkitSpeechRecognition();

//   recognition.interimResults = true;
//   recognition.continuous = true;

//   recognition.onresult = function (event) {
//     var interim_transcript = '';
//     // for (var i = event.resultIndex; i < event.results.length; ++i) {
//     //   if (event.results[i].isFinal) {
//     //     final_transcript += event.results[i][0].transcript;
//     //   } else {
//     //     interim_transcript += event.results[i][0].transcript;
//     //   }
//     // }

//     console.log(event.results);
//   };

//   // speech recognition API supported
// } else {
//   // speech recognition API not supported
// }

ReactDOM.render(<App />, document.getElementById('root'));

//Hey! Remember you have to attribute Smashicons
//Every time you attribute, you get +10 to your Karma
