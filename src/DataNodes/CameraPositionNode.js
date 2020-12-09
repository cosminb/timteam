import _ from 'lodash';

export const CameraPositionNode = (props, resolve, dataLayer, item) => {
  let current = {
    changeCamera: props => {
      _.merge(item.props, props);
      update(item.props);
    },
  };

  const update = props => {
    let changed = false;

    if (props.position && !_.isEqual(current.position, props.position)) {
      changed = true;
      current.position = props.position.slice(0);
    }
    if (props.lookAt && !_.isEqual(current.lookAt, props.lookAt)) {
      changed = true;
      current.lookAt = props.lookAt.slice(0);
    }

    if (changed) resolve(current);
  };

  update(props);
  return {
    update,
  };
};
