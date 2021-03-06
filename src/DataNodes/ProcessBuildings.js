import { _ } from '../jams/common';
import { Building } from '../Space3D/Building';

export const ProcessBuildings = (props, resolve, dataLayer) => {
  // console.log('proceesBuildings');
  let currentBuildings;

  // let timer = window.setInterval(() => {
  //   _.each(currentBuildings, node => {
  //     node.props.scale[1] = Math.random() * 80;
  //     node.props.scale = node.props.scale.slice(0);
  //     // node.props.position = [
  //     //   node.props.position[0],
  //     //   node.props.scale[1] / 2 - 50,
  //     //   node.props.position[2],
  //     // ];
  //   });
  //   resolve(currentBuildings);
  // }, 3000);
  const update = props => {
    guard.update({ buildings: 'buildings', colors: 'colors', buildingSizes: 'buildingSizes' });

    let cellSize = 75;
    let cellSize2 = 75;
    let rows = 6;
    let cols = 6;
    let blockWidth = 45;

    let box = {
      sizeXHalf: (cols * cellSize) / 2 - blockWidth / 4,
      sizeZHalf: (rows * cellSize) / 2 - blockWidth / 4,
    };

    if (!guard.value.buildings.all) return;

    let value = _.map(guard.value.buildings.all, building => {
      let height = building.issite ? 50 : building.height + 10;
      // console.log(building);
      let scale = [blockWidth, height, blockWidth];
      let position = [
        building.col * cellSize - box.sizeXHalf,
        0,
        building.row * cellSize - box.sizeZHalf,
      ];

      // let poseCamera = [
      //   180 * Math.cos((Math.PI * 30) / 180) + position[0],
      //   height + 10,
      //   180 * Math.sin((Math.PI * 30) / 180) + position[2],
      // ];

      // let poseTarget = [
      //   50 * Math.cos((Math.PI * -30) / 180) + position[0],
      //   height,
      //   50 * Math.sin((Math.PI * -30) / 180) + position[2],
      // ];

      // let pose = {
      //   lookAt: poseTarget,
      //   position: poseCamera,
      //   animate: true,
      // };

      let colorItem = '';

      if (building.hasError) {
        colorItem = 'rgb(128, 30, 30)';
      } else if (!building.issite) {
        colorItem = 'rgb(51, 51, 51)';
      } else {
        colorItem = 'rgb(30, 91, 183)';
      }

      return {
        component: Building,

        props: {
          position: position,
          scale: scale,
          color: colorItem,
          key: building.index,
          index: building.index,
          //top: [scale[0] / 2, scale[1], scale[2] / 2],
          top: [scale[0] / 2, scale[1], scale[2] / 2],
          hasBilboard: building.issite,
          opacity: 0.9,
          height,
          // pose: pose,
          issite: building.issite,
          name: building.name,
        },
      };
    });

    currentBuildings = value;
    resolve(value);
  };

  let guard = dataLayer.watchAll(update);
  update();

  return {
    update,
    shouldUpdate: props => false,
    unwind: () => {
      guard.unwind();
      window.clearInterval(timer);
    },
  };
};
