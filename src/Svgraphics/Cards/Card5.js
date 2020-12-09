import React from 'react';
import {} from 'react-spring';
import { animated, useSprings, useTransition, a } from 'react-spring';
import { _ } from '../../jams/common';
import faker from 'faker';

const useInterval = (cb, ms) => {
  let cbRef = React.useRef(cb);

  cbRef.current = cb;

  React.useEffect(() => {
    let timer = window.setInterval(() => {
      cbRef.current();
    }, ms);

    return () => window.clearInterval(timer);
  }, [ms]);
};

export const Card5 = () => {
  let [items, setItems] = React.useState([]); //

  const height = 50;

  const makeItem = () => {
    return { key: Date.now() + Math.random(), text: faker.hacker.phrase() };
  };

  const makeItems = () => {
    let items = _.times(5, makeItem);

    // items.sort(() => 0.5 - Math.random());
    // _.each(items, (item, pos) => (item.position = pos));
  };

  const removeItem = items => {
    let randomKey = Math.floor(Math.random() * items.length);
    items = items.splice(randomKey, 1); //items[randomKey].key += Date.now();
  };

  const addItem = items => {
    items.push(makeItem());
  };

  const updateItems = () => {
    if (Math.random() < 0.4) removeItem(items);

    if (Math.random() < 0.4) addItem(items);

    while (items.length < 5) addItem(items);
    while (items.length > 6) removeItem(items);
    _.each(items, (item, pos) => (item.position = pos));
    setItems(items.slice(0));
  };

  useInterval(updateItems, 4000);

  const transition = useTransition(items, {
    from: {
      opacity: 0,
      y: 7 * height,
    },
    key: item => item.key,
    leave: {
      opacity: 0,
      y: 0,
    },
    enter: item => {
      return {
        opacity: 1,
        y: item.position * height,
      };
    },
    update: item => {
      return {
        opacity: 1,
        y: item.position * height,
      };
    },

    config: {
      frequency: 1,
      damping: 0.7,
    },
  });

  let nodes = transition((style, item, t, i) => {
    return <a.div style={{ ...style, position: 'absolute', top: 0 }}>{item.text}</a.div>;
  });

  return (
    <div className="card" style={{ position: 'relative', height: 250 }}>
      {nodes}
    </div>
  );
};
