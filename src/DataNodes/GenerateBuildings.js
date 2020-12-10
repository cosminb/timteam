import { _ } from '../jams/common';

export const GenerateBuildings = (props, resolve) => {
  const update = props => resolve(GetBuildingsGrid(props));

  update(props);
  return {
    update,
  };
};
const GetBuildingsGrid = ({ cols, rows }) => {
  let total = rows * cols;
  let siteBuildings = 10;

  let buildings = _.times(total, i => {
    return {
      index: i,
      row: Math.floor(i / rows),
      col: Math.floor(i % cols),
      height: Math.random() * 10,
    };
  });

  buildings = buildings.sort(() => 0.5 - Math.random());

  let result = {
    all: buildings,
    site: buildings.slice(0, siteBuildings),
    neighbours: buildings.slice(siteBuildings),
  };

  result.site.forEach((item, index) => {
    item.issite = true;
    item.siteIndex = index;
    item.hasError = Math.random() < 0.3;
  });

  return result;
};
