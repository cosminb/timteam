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

    cbRef.current();

    return () => window.clearInterval(timer);
  }, [ms]);
};

export const Card5 = () => {
  let [items, setItems] = React.useState([]); //

  const height = 50;
  let notificationsArray = [
    'Site 49: Panel P from floor F1 is now Offline',
    'Site 30: Panel P from floor F4 is now Online',
    'Site 20: Door D from floor F3 is now Offline',
    'Site 15: Door D from floor F5 is now Online',
    'Site 73: Camera C from floor F8 is now Offline',
    'Site 60: Camera C from floor F2 is now Online',
  ];

  const makeItem = () => {
    return {
      key: Date.now() + Math.random(),
      text: notificationsArray[Math.floor(Math.random() * notificationsArray.length)],
    };
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

  useInterval(updateItems, 10000);

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
    let textColor = item.text.includes('Offline') ? 'red' : 'white';

    return (
      <a.div style={{ ...style, position: 'absolute', top: 0, color: textColor }}>
        {item.text}
      </a.div>
    );
  });

  return (
    <>
      <div className="card" style={{ position: 'relative', height: 250, flex: '1' }}>
        <div className="sectionTitle">Notifications</div>
        <div style={{ position: 'relative' }}>{nodes}</div>
      </div>
    </>
  );
};
