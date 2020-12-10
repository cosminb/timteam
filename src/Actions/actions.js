export const action_focus_building = ({ index }, data) => {
  data.run('building_focus', { index });

  data.run('component_main_change', {
    id: 'infoPanel',
    style: {
      width: '50%',
      height: '100%',
    },
  });

  data.updateApp();
};

export const action_overview = ({}, data) => {
  data.run('buildings_overview', {});
  data.run('component_main_change', {
    id: 'infoPanel',
    style: {
      width: '0%',
      height: '0%',
    },
  });

  data.updateApp();
};

export const ChangeCard = ({ id, props = {}, spec = {}, remove = false }) => {
  let path = 'app.subs.root.subs.sidebar.subs.' + id;

  if (remove) _.unset(data.specTree, path);
  else {
    let component = _.get(data.specTree, path);

    _.merge(component, { props, ...spec });
  }
};
