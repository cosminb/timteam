import _, { iteratee } from 'lodash';

_.mergeAt = (target, path, value) => {
  let targetValue = _.get(target, path);

  if (!targetValue) _.set(target, path, value);
  else _.merge(targetValue, value);
};

_.inc = value => (value || 0) + 1;

_.mapTree = (obj, cb) => {
  let iterate = (value, path) => {
    if (!_.isObjectLike(value)) return value;
    let result = _.mapValues(value, (value, slot) => {
      let itemPath = path.concat([slot]);
      let newValue = cb(value, itemPath, iterate);
      if (_.isUndefined(newValue)) return iterate(value, itemPath);
      else return newValue;
    });

    return result;
  };

  return iterate(obj, []);

  return result;
};

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
