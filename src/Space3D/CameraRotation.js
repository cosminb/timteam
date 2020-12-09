import React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { useSpring } from 'react-spring/three';

export const CameraRotation = ({ camera }) => {
  const { camera: cc } = useThree();

  const ref = React.useRef();

  const [newSprings, setNewSprings] = React.useState({});
  const lastCamera = React.useRef({});

  const [springs, setSprings] = useSpring(() => {});

  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    if (!cc || !camera || camera.animate === false) return;

    let currentCamera = cc.clone();

    lastCamera.current = 1;
    console.log(camera.version);

    let newSprings = { from: {}, to: {} };
    let hasChanged = false;

    var startRotation = currentCamera.quaternion.clone();
    var startPosition = currentCamera.position.clone();

    if (camera.position) {
      currentCamera.position.fromArray(camera.position);

      newSprings.from.position = startPosition.toArray();
      newSprings.to.position = camera.position;

      hasChanged = true;
    }

    if (camera.lookAt) {
      newSprings.from.quaternion = startRotation.toArray();

      currentCamera.lookAt(...camera.lookAt);

      var endRotation = currentCamera.quaternion.clone();
      newSprings.to.quaternion = endRotation.toArray();

      hasChanged = true;
      currentCamera.position.copy(startPosition);
    }

    // if (camera.position) {
    //   newSprings.from.position = currentCamera.position.clone().toArray();
    //   newSprings.to.position = camera.position;
    //   hasChanged = true;
    // }
    if (camera.position) {
      currentCamera.quaternion.copy(startRotation);
    }

    console.log('hasChanged', newSprings);

    let lookAt = camera.lookAt;
    if (hasChanged) {
      setSprings({
        ...newSprings,

        config: {
          damping: 0.9,
          frequency: 2,
        },

        ref: springRef,
        reset: true,
        onRest: () => {
          let controls = ref.current;

          controls.target.set(...lookAt);
          controls.update();

          setAnimating(false);
        },
      });

      setAnimating(true);
      //setNewSprings(newSprings);
      //if (springRef.current) springRef.current.stop();
    }

    lastCamera.current = 0;

    //else setNewSprings({});
  }, [camera.version]);

  const springRef = React.useRef();

  React.useEffect(() => {
    console.log('restarting springs ');
    // if (springRef.current) springRef.current.start();
  }, [newSprings]);
  console.log(springRef, springs, camera, newSprings);

  // springs.position._start();
  if (springs.position) {
    console.log(springs.position._phase);
  }

  React.useEffect(() => {
    if (camera.animate === false) {
      lastCamera.current = 1;

      const controls = ref.current;

      console.log(controls);

      if (!controls.target) return;

      cc.position.fromArray(camera.position);
      controls.target.set(...camera.lookAt);
      controls.update();

      // cc.position.fromArray(camera.position);
      // cc.lookAt(...camera.lookAt);
      // cc.up = new THREE.Vector3(0, 0, 0);
      console.log(camera.position, camera.lookAt);
    }
  }, [camera.version]);

  useFrame(state => {
    const time = state.clock.getElapsedTime();

    let _camera = state.camera;

    window.camera = state.camera;

    if (lastCamera.current) return;

    // console.log(springs.quaternion && springs.quaternion.is('ACTIVE'));
    // console.log(springs.position && springs.position.is('ACTIVE'));
    if (animating) {
      let value = springs.quaternion.get();
      // console.log(value);
      _camera.quaternion.fromArray(value);

      let value2 = springs.position.get();
      // console.log(value);
      _camera.position.fromArray(value2);
    }
    // if (springs.quaternion && springs.quaternion.is('ACTIVE')) {
    //   let value = springs.quaternion.get();
    //   // console.log(value);
    //   _camera.quaternion.fromArray(value);
    // }
    // if (springs.position && springs.position.is('ACTIVE')) {
    //   let value = springs.position.get();
    //   // console.log(value);
    //   _camera.position.fromArray(value);
    // }
    // if (springs.lookAt.is('ACTIVE')) {
    //   let value = springs.lookAt.get();
    //   _camera.lookAt(...value);
    // }
    // console.log(springs.position.get());
    // console.log(springs);
    // let transition = transitionRef.current;
    // if (!transition.position.isDone) {
    //   if (spring.is('IDLE')) {
    //     transition.position.isDone = true;
    //     transition.lookAt.isDone = true;
    //   }
    //   let position = transition.position.value();
    //   _camera.position.set(...position);
    //   let value = transition.lookAt.isDone ? transition.lookAt.end : transition.lookAt.value();
    //   _camera.lookAt(...value); //0, 0, 0);
    // }
  });

  React.useEffect(() => {
    ref.current.reset();
  }, []);
  console.log(animating);
  return <OrbitControls ref={ref} enabled={!animating} />;
};
