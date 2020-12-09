import React from 'react';

export const DataCtx = React.createContext({});

const processor_getItemValue = function (props, resolve) {
  resolve(this.value);

  return {};
};
class Register {
  constructor(dataLayer) {
    this.items = {};
    this.dataLayer = dataLayer;
  }
  addItem(key, newItem) {
    // console.log('addItem', key, newItem);

    let item = {
      key,
      processor: newItem.processor || processor_getItemValue,
      props: Object.assign({}, newItem.props),
      value: newItem.value,
      version: 0,
      specs: newItem,
    };

    this.items[key] = item;
    this.dataLayer.addBubble(key, item);

    let result = item.processor(item.props, item.triggerUpdate, this.dataLayer, item);

    if (_.isFunction(result)) {
      item.unwind = result;
    }
    if (result.unwind) item.unwind = result.unwind;
    if (result.update) item.update = result.update;
    if (result.shouldUpdate) item.shouldUpdate = result.shouldUpdate;
    if (result.value) item.value = result.value;
    if (result.version) item.version = result.version;

    _.defaults(item, {
      unwind: () => {},
      update: props => {},
      shouldUpdate: function (newProps) {
        return !_.isEqual(newProps, this.props);
      },
      version: 1,
    });
  }
  removeItem(key) {
    // console.log('removeItem', key);
    let item = this.items[key];
    this.dataLayer.removeBubble(key, item);

    if (item.unwind) item.unwind();
    delete this.items[key];
  }

  changeItem(key, newItem) {
    // console.log('changeItem', key, newItem);
    let item = this.items[key];

    if (item.processor != newItem.processor) {
      this.removeItem(key);
      this.addItem(key, newItem);
      return;
    }

    item.specs = newItem;
    if (item.shouldUpdate(newItem.props)) {
      //   console.log('should update', newItem);
      item.update(newItem.props);
      item.props = Object.assign({}, newItem.props);
    }
  }

  update(items) {
    _.each(this.items, (item, key) => {
      if (!items[key]) this.removeItem(key);
    });
    _.each(items, (item, key) => {
      if (this.items[key]) {
        this.changeItem(key, item);
      } else {
        this.addItem(key, item);
      }
    });
  }

  unwind() {
    _.each(this.items, (item, key) => {
      this.removeItem(key);
    });
  }
}

export const useDataBubbles = dataSpecs => {
  const actions = React.useContext(DataCtx);

  const topBubbleRef = React.useRef({});
  const registerRef = React.useRef();

  React.useEffect(() => {
    let register = new Register(actions);

    registerRef.current = register;

    register.update(dataSpecs);
    return () => {
      register.unwind();
    };
  }, []);

  //   React.useEffect(() => {
  let register = registerRef.current;
  if (register && register.update) register.update(dataSpecs);
  // console.log(register, actions);
  //   }, [dataSpecs]);
};

class PubSub {
  constructor() {
    this.triggers = {};
  }

  triggerAll(key) {
    let triggers = _.get(this.triggers, key);
    if (!triggers) return;
    _.each(triggers, trigger => trigger.fire());
  }

  watch(key, guard) {
    let triggers = _.get(this.triggers, key);

    if (!triggers) {
      triggers = [];
      _.set(this.triggers, key, triggers);
    }

    triggers.push(guard);

    if (!guard.watchedKeys) guard.watchedKeys = [];

    guard.watchedKeys.push(key);
  }

  forget(key, guard) {
    let triggers = _.get(this.triggers, key);

    if (!triggers) return;

    _.remove(triggers, t => t == guard);
    _.remove(guard.watchedKeys, k => k == key);

    if (!triggers.length) _.unset(this.triggers, key);
  }
}

class BubblesManager {
  constructor(top) {
    this.bubbles = {};
    this.top = top;
  }

  addBubble(key, bubble) {
    let triggerUpdate = (value, version) => {
      bubble.value = value;
      if (version) bubble.version = version;
      else bubble.version++;

      this.top.triggerUpdate(key);

      //   console.log(bubble);
    };

    bubble.triggerUpdate = triggerUpdate;

    this.bubbles[key] = bubble;
  }

  removeBubble(key) {
    delete this.bubbles[key];
  }

  getValue(key) {
    let bubble = this.bubbles[key];

    if (!bubble) return undefined;

    return bubble.value;
  }

  getVersion(key) {
    let bubble = this.bubbles[key];

    if (!bubble) return undefined;

    return bubble.version;
  }
}

export class DataLayer {
  constructor(triggerUpdate) {
    this.bubbles = {};

    this.pubsub = new PubSub();

    this.bubbles = new BubblesManager(this);

    this.triggerUpdateCb = triggerUpdate;

    this.commands = {};
  }

  registerCommands(commands) {
    _.merge(this.commands, commands);
  }

  run(commandName, args) {
    if (!this.commands[commandName]) return;

    return this.commands[commandName](args, this);
  }
  addBubble(key, bubble) {
    this.bubbles.addBubble(key, bubble);
  }
  removeBubble(key, bubble) {
    this.bubbles.removeBubble(key, bubble);
  }

  triggerUpdate(key) {
    this.pubsub.triggerAll(key);
  }

  watch(key, guard) {
    this.pubsub.watch(key, guard);
  }
  forget(key, guard) {
    this.pubsub.forget(key, guard);
  }

  watchAll(fire, map) {
    let dataLayer = this;
    let guard = {
      fire: _.debounce(function (key) {
        // console.log('fired', this);
        guard.getValue();
        guard.version++;
        fire();
      }, 100),
      watchedKeys: [],
      map: {},
      value: {},
      version: 1,
      update: function (newMap) {
        let newKeys = _.values(newMap);
        let changed = false;
        _.each(guard.watchedKeys, key => {
          if (!newKeys.includes(key)) {
            dataLayer.forget(key, guard);
            changed = true;
          }
        });

        _.each(newMap, (key, name) => {
          if (!guard.watchedKeys.includes(key)) {
            dataLayer.watch(key, guard);
            changed = true;
          }
        });

        guard.map = newMap;
        if (changed) {
          guard.getValue();
          guard.version++;
        }
      },
      getValue: function () {
        guard.value = _.mapValues(guard.map, (source, target) => dataLayer.getValue(source));
        guard.versions = _.mapValues(guard.map, (source, target) => dataLayer.getVersion(source));
        return guard.value;
      },
      unwind: function () {
        _.each(guard.watchedKeys, key => {
          dataLayer.forget(key, guard);
        });
      },
    };

    if (map) guard.update(map);

    return guard;
  }

  getValue(key) {
    return this.bubbles.getValue(key);
  }

  getVersion(key) {
    return this.bubbles.getVersion(key);
  }
  wrapper(node) {
    return <DataCtx.Provider value={this}>{node}</DataCtx.Provider>;
  }

  getSubContext() {}

  registerData(key, item) {}
}

export const useData = map => {
  const actions = React.useContext(DataCtx);

  const guardRef = React.useRef({});
  const [version, forceRefresh] = React.useReducer(v => v + 1, 0);
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    const triggerUpdate = () => {
      //console.log('triggerUpdate', guard);
      forceRefresh();
    };
    let guard = actions.watchAll(triggerUpdate);

    guardRef.current = guard;

    // setValue(guard.getValue());
    return () => guard.unwind();
  }, []);

  React.useEffect(() => {
    let guard = guardRef.current;
    guard.update(map);
    // setValue(guard.getValue());
  }, [map]);

  return [guardRef.current.value || {}, guardRef.current.versions || {}];
};
