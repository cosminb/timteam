import { _ } from '../jams/common';

export const GenerateBuildings = (props, resolve) => {
  let buildingGrid = GetBuildingsGrid(props);

  setInterval(() => {
    let index = Math.floor(Math.random() * buildingGrid.site.length);
    let hasError = Math.random() < 0.5;

    if (hasError != buildingGrid.site[index].hasError) {
      buildingGrid.site[index].hasError = hasError;
      resolve(buildingGrid);
    }
  }, 5000);

  const update = props => resolve(buildingGrid);

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

  result.all.sort((a, b) => {
    return a.index - b.index;
  });

  result.site.forEach((item, index) => {
    item.issite = true;
    item.siteIndex = index;
    item.hasError = Math.random() < 0.5;
  });

  return result;
};
