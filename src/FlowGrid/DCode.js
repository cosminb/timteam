import _ from 'lodash';

export const DCode = {
  eval: (base, code) => {
    try {
      let fn = new Function(
        'base',
        'code',
        `
        try { 
          with( base ) {
            return eval( code )
          }
        } catch ( error ) { 
            console.log( error )
            return { error }
        }
      `
      );
      let result = fn(base, code);
      return result;
    } catch (e) {
      console.log(error);
      return { error };
    }
  },

  getFn: code => {
    try {
      let fn = eval(`(${code})`);
      return fn;
    } catch (e) {
      console.log(e);
    }
  },

  objToStr: function (obj) {
    let ops = [];

    const iterate = (obj, path) => {
      if (_.isFunction(obj)) {
        ops.push({ path: path.join('.'), fnCode: obj.toString() });
      } else if (_.isObjectLike(obj)) {
        _.each(obj, (obj, slot) => iterate(obj, path.concat([slot])));
      }
    };

    iterate(obj, []);

    let str = JSON.stringify({
      VALUE: obj,
      OPS: ops,
    });

    return str;
  },

  strToObj: function (str) {
    if (!str) return {};

    let obj = JSON.parse(str);
    let value;
    if (obj.VALUE) {
      value = obj.VALUE;
      if (obj.OPS) {
        _.each(obj.OPS, op => {
          _.set(value, op.path, DCode.getFn(op.fnCode));
        });
      }
    } else {
      value = obj;
    }

    return value;
  },

  strToValue: function (str) {
    try {
      let obj = eval(`( ${str} )`);
      return obj;
    } catch (error) {
      return { error };
    }
  },

  valueToStr: function (obj) {
    let fns = [];

    let str = JSON.stringify(
      obj,
      (key, value) => {
        if (_.isFunction(value)) {
          let id = fns.length;
          fns.push(_.toString(value));
          return 'FN' + id;
        }
        return value;
      },
      2
    );

    _.each(fns, (fn, id) => {
      str = str.replace('FN' + id, fn);
    });

    return str;
  },
};
