import React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { useSpring } from 'react-spring/three';
import { useData } from '../FlowGrid/DataCtx';

export const CameraRotation = () => {
  const [data, versions] = useData({ camera: 'camera' });

  const { camera: cc } = useThree();

  const ref = React.useRef();

  const [newSprings, setNewSprings] = React.useState({});
  const lastCamera = React.useRef({});

  const [springs, setSprings] = useSpring(() => {});

  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    let camera = data && data.camera;

    if (!cc || !camera) return;

    let currentCamera = cc.clone();

    lastCamera.current = 1;
    // console.log(camera.version);

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

    // console.log('hasChanged', newSprings);

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
  }, [versions && versions.camera]);

  const springRef = React.useRef();

  React.useEffect(() => {
    let camera = data && data.camera;

    if (!camera) return;

    if (camera.animate === false) {
      lastCamera.current = 1;

      const controls = ref.current;

      // console.log(controls);

      if (!controls.target) return;

      cc.position.fromArray(camera.position);
      controls.target.set(...camera.lookAt);
      controls.update();

      // cc.position.fromArray(camera.position);
      // cc.lookAt(...camera.lookAt);
      // cc.up = new THREE.Vector3(0, 0, 0);
      // console.log(camera.position, camera.lookAt);
    }
  }, [versions && versions.camera]);

  useFrame(state => {
    let _camera = state.camera;

    if (lastCamera.current) return;

    // console.log(springs.quaternion && springs.quaternion.is('ACTIVE'));
    // console.log(springs.position && springs.position.is('ACTIVE'));
    if (animating) {
      let value = springs.quaternion.get();
      // console.log(value);
      _camera.quaternion.fromArray(value);

      let value2 = springs.position.get();
      _camera.position.fromArray(value2);
    }
  });

  // React.useEffect(() => {
  //   ref.current.reset();
  // }, []);
  // // console.log(animating);
  return <OrbitControls ref={ref} enabled={!animating} />;
};
