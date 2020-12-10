export const building_focus = ({ index }, data) => {
  let buildings = data.getValue('buildingsNodes');

  let building = _.find(buildings, building => building.props.index === index);

  let { position, height } = building.props;

  let poseCamera = [
    180 * Math.cos((Math.PI * 30) / 180) + position[0],
    height + 10,
    180 * Math.sin((Math.PI * 30) / 180) + position[2],
  ];

  let poseTarget = [
    50 * Math.cos((Math.PI * -30) / 180) + position[0],
    height,
    50 * Math.sin((Math.PI * -30) / 180) + position[2],
  ];

  let pose = {
    lookAt: poseTarget,
    position: poseCamera,
    animate: true,
  };

  // data.getValue('camera').changeCamera(pose);
  data.specTree.app.subs.root.data.camera.props = pose;
};

export const buildings_overview = ({}, data) => {
  let pose = {
    lookAt: [0, 0, 0],
    position: [350, 150, 350],
    animate: true,
  };

  //data.getValue('camera').changeCamera(pose);

  data.specTree.app.subs.root.data.camera.props = pose;
};
