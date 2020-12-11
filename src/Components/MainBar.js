import React from 'react';
import { animated } from 'react-spring';
import { useSprings } from 'react-spring/three';
import _ from 'lodash';
import { DataCtx } from '../FlowGrid/DataCtx';

export const MainBar = ({ style }) => {
  return (
    <div style={style} className="card">
      <MainBarSign />
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
  let actionsCtx = React.useContext(DataCtx);

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
    final_transcript: '',
    interim_transcript: '...',
  });

  const [output, setOutput] = React.useState([]);

  React.useEffect(() => {
    speechRef.current = VoiceCommands.setup(
      setTranscript,
      state => {
        console.log('setting state', state);
        if (state == true) {
          set(makeItem);
          setState(true);
        } else {
          size = 2;
          set(resetItem);
          setState(false);
        }
      },
      command => {
        command = command.toLowerCase();

        setOutput(v => {
          if (command.indexOf('good') != -1 || command.indexOf('project') != -1) {
            command = 'goodWork';
          }

          v.push({ command, date: Date.now() });

          if (v.length > 4) v = v.slice(v.length - 4, v.length);

          return v.slice(0);
        });

        actionsCtx.run('command_run', { command });

        //console.log('running command');
      }
    );
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

  console.log(output);
  const outputnodes = _.map(output, i => {
    if (i.command === 'goodWork') {
      return (
        <div>
          It is an awesome project. Developed by Team
          <sup className="super">
            Tim<sup className="super">TM</sup>
          </sup>{' '}
          (Daniela, Lavinia & Cosmin ) for <span className="sf"> Brivo SF 2020</span>
        </div>
      );
    }

    return (
      <div>
        [{i.date}] {i.command}
      </div>
    );
  });

  return (
    <div className="mainBar" onClick={click}>
      <svg width="100px" height="100%">
        <g style={{ translate: '25px 25px' }}>{nodes}</g>
      </svg>

      <div style={{ gridArea: 'output' }}> {outputnodes} </div>
      <div style={{ gridArea: 'input', fontSize: 40 }}>
        <Microphone state={state} />
        <span style={{ color: 'white' }} onChange={handleChange} className="maininputinput">
          {transcript.final_transcript}
        </span>{' '}
        <span style={{ color: '#007abc' }}>{transcript.interim_transcript}</span>
      </div>
    </div>
  );
};

const Microphone = ({ state }) => {
  if (!state) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 140.138 134.138">
        <g id="no_microphone_blue" transform="translate(-249.431 -292.431)">
          <path
            id="microphone_blue"
            d="M43.151,86.3A23.536,23.536,0,0,0,66.687,62.764V23.537a23.537,23.537,0,1,0-47.073,0V62.764A23.536,23.536,0,0,0,43.151,86.3ZM82.378,47.073H78.456A3.922,3.922,0,0,0,74.533,51V62.764a31.418,31.418,0,0,1-34.518,31.23C23.711,92.4,11.768,77.747,11.768,61.367V51a3.922,3.922,0,0,0-3.923-3.923H3.923A3.922,3.922,0,0,0,0,51v9.846c0,21.977,15.684,41.569,37.266,44.546v8.373H23.537a3.922,3.922,0,0,0-3.923,3.923v3.923a3.922,3.922,0,0,0,3.923,3.923H62.764a3.922,3.922,0,0,0,3.923-3.923v-3.923a3.922,3.922,0,0,0-3.923-3.923H49.035v-8.28A43.192,43.192,0,0,0,86.3,62.764V51A3.922,3.922,0,0,0,82.378,47.073Z"
            transform="translate(276 299)"
            fill="#739dd3"
          />
          <line
            id="Line_1"
            data-name="Line 1"
            y1="120"
            x2="126"
            transform="translate(256.5 299.5)"
            fill="none"
            stroke="#739dd3"
            stroke-linecap="round"
            stroke-width="10"
          />
        </g>
      </svg>
    );
  } else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 86.301 125.529">
        <path
          id="microphone_white"
          d="M43.151,86.3A23.536,23.536,0,0,0,66.687,62.764V23.537a23.537,23.537,0,1,0-47.073,0V62.764A23.536,23.536,0,0,0,43.151,86.3ZM82.378,47.073H78.456A3.922,3.922,0,0,0,74.533,51V62.764a31.418,31.418,0,0,1-34.518,31.23C23.711,92.4,11.768,77.747,11.768,61.367V51a3.922,3.922,0,0,0-3.923-3.923H3.923A3.922,3.922,0,0,0,0,51v9.846c0,21.977,15.684,41.569,37.266,44.546v8.373H23.537a3.922,3.922,0,0,0-3.923,3.923v3.923a3.922,3.922,0,0,0,3.923,3.923H62.764a3.922,3.922,0,0,0,3.923-3.923v-3.923a3.922,3.922,0,0,0-3.923-3.923H49.035v-8.28A43.192,43.192,0,0,0,86.3,62.764V51A3.922,3.922,0,0,0,82.378,47.073Z"
          fill="#fff"
        />
      </svg>
    );
  }
};
const VoiceCommands = {
  setup: function (updateTranscript, updateState, runCommand) {
    this.updateTranscript = updateTranscript;
    this.updateState = updateState;
    this.runCommand = runCommand;

    if ('webkitSpeechRecognition' in window) {
      let recognition = new webkitSpeechRecognition();

      recognition.interimResults = true;
      recognition.continuous = true;

      // var final_transcript = '';

      // recognition.onerror = function (e) {
      //   console.log('onerror', e);
      // };
      // recognition.onspeechend = function (e) {
      //   console.log('speechend', e);
      // };
      // recognition.onspeechstart = function (e) {
      //   console.log('speechstart', e);
      // };
      // recognition.onnomatch = function (e) {
      //   console.log('onnomatch', e);
      // };
      // recognition.onsoundstart = function (e) {
      //   console.log('onsoundstart', e);
      // };
      // recognition.onsoundend = function (e) {
      //   console.log('onsoundend', e);
      // };

      this.recognition = recognition;

      recognition.onresult = event => {
        this.processResults(event);
      };
    } else {
    }

    return this;
  },

  start: function () {
    this.final_transcript = [];
    this.recognition.start();
    this.updateState(true);
    this.stopTimer();
  },

  stop: function () {
    this.stopTimer();
  },

  processResults: function (event) {
    this.interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        this.final_transcript.push(event.results[i][0].transcript);
      } else {
        this.interim_transcript += event.results[i][0].transcript;
      }
    }

    this.updateTranscript({
      final_transcript: this.final_transcript.join(''),
      interim_transcript: this.interim_transcript,
    });
    this.restartTimer();

    console.log({
      final_transcript: this.final_transcript,
      interim_transcript: this.interim_transcript,
    });
  },

  stopTimer: function () {
    window.clearTimeout(this.timer);
  },
  restartTimer: function () {
    window.clearTimeout(this.timer);

    this.timer = window.setTimeout(() => {
      if (this.interim_transcript) {
        this.restartTimer();
      } else this.executeCommands();
    }, 300);
  },

  executeCommands: function () {
    this.recognition.stop();
    this.stopTimer();
    this.updateState(false);

    let command = this.final_transcript.join('');

    this.final_transcript = [];
    this.interim_transcript = '';

    this.updateTranscript({
      final_transcript: this.final_transcript.join(''),
      interim_transcript: this.interim_transcript,
    });

    this.runCommand(command);
  },
};
