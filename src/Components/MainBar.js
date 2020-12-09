import React from 'react';
import { animated } from 'react-spring';
import { useSprings } from 'react-spring/three';
import _ from 'lodash';

export const MainBar = ({ style }) => {
  return (
    <div style={style} className="card">
      <MainBarSign />

      <input />
    </div>
  );
};

const useInterval = (cb, ms, stoped) => {
  let cbRef = React.useRef(cb);

  cbRef.current = cb;

  React.useEffect(() => {
    if (stoped) return;

    let timer = window.setInterval(() => {
      cbRef.current();
    }, ms);

    return () => window.clearInterval(timer);
  }, [ms, stoped]);
};

const MainBarSign = () => {
  const count = 10;
  let size = Math.random() * 0.5 + 1;
  const makeItem = i => ({
    cx: 25,
    cy: 25,

    r: i * size,
    fill: 'none',
    strokeWidth: size,
    // opacity: Math.random(),
    stroke: 'orange',

    transform: `scaleY(${1 - Math.random() * 2})`,
    config: {
      frequency: 2,
      damping: 0.9,
    },

    // onRest: updateAnimation,
  });

  const updateAnimation = () => {
    size = Math.random() * 4 + 0.5;
    set(makeItem);
  };

  const resetItem = i => ({
    cx: 25,
    cy: 25,

    r: i * size,
    fill: 'none',
    strokeWidth: size,
    opacity: 1,
    // opacity: Math.random() + 0.4,
    stroke: '#007abc',

    transform: `scaleY(1)`,
    config: {
      frequency: 0.5,
      damping: 1,
    },
  });

  const [springs, set, stop] = useSprings(count, resetItem);

  const [state, setState] = React.useState(false);

  useInterval(
    () => {
      size = Math.random() * 4 + 0.5;
      set(makeItem);
    },
    600,
    !state
  );

  const speechRef = React.useRef();
  const [transcript, setTranscript] = React.useState({
    final_transcript: '>',
    interim_transcript: 'click and say something',
  });

  React.useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      let recognition = new webkitSpeechRecognition();
      speechRef.current = recognition;
      window.recognition = recognition;

      recognition.interimResults = true;
      recognition.continuous = true;

      var final_transcript = '';

      recognition.onerror = function (e) {
        console.log('onerror', e);
      };
      recognition.onspeechend = function (e) {
        console.log('speechend', e);
      };
      recognition.onspeechstart = function (e) {
        console.log('speechstart', e);
      };
      recognition.onnomatch = function (e) {
        console.log('onnomatch', e);
      };
      recognition.onsoundstart = function (e) {
        console.log('onsoundstart', e);
      };
      recognition.onsoundend = function (e) {
        console.log('onsoundend', e);
      };

      recognition.onresult = function (event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        set(makeItem);
        setTranscript({ final_transcript, interim_transcript });
        console.log(event.results);
      };
    } else {
    }
  }, []);

  const handleChange = e => {
    let text = e.target.value;
    setTranscript(v => ({ final_transcript: text, interim_transcript: v.interim_transcript }));
  };
  let nodes = _.times(count, i => {
    return <animated.circle style={springs[i]} className="circle" />;
  });

  const click = () => {
    if (state == false) {
      set(makeItem);
      speechRef.current.start();
      setState(true);
    } else {
      speechRef.current.stop();
      size = 2;
      set(resetItem);
      setState(false);
    }
  };
  return (
    <div className="mainBar" onClick={click}>
      <svg width="100px" height="100%">
        <g style={{ translate: '25px 25px' }}>{nodes}</g>
      </svg>

      <div style={{ gridArea: 'output' }}></div>
      <div style={{ gridArea: 'input', fontSize: 40 }}>
        <span style={{ color: 'white' }} onChange={handleChange} className="maininputinput">
          {transcript.final_transcript}
        </span>{' '}
        <span style={{ color: '#007abc' }}>{transcript.interim_transcript}</span>
      </div>
    </div>
  );
};
