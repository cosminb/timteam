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
    'Site 49: Panel P1 from floor F1 is now Offline',
    'Site 30: Panel P2 from floor F4 is now Online',

    'Site 20: Door D1 from floor F3 is now Offline',
    'Site 15: Door D2 from floor F5 is now Online',

    'Site 25: Door D3 from floor F3 has status: Held open too long',
    'Site 27: Door D4 from floor F7 has status: Lock Offline',
    'Site 39: Door D4 from floor F3 has status: Door Wiring Shorted',
    'Site 5: Door D4 from floor F9 has status: Door Wiring Cut',
    'Site 17: Door D4 from floor F1 has status: Scheduled Unlock',
    'Site 20: Door D4 from floor F2 has status: Scheduled Unlock',

    'Site 30: Panel P3 from floor F4 has status: Battery Level Unknown',
    'Site 30: Panel P4 from floor F4 has status: Battery Level Very Low',
    'Site 30: Panel P5 from floor F6 has status: Battery Level Low',
    'Site 15: Panel P6 from floor F5 has status: Low Battery',

    'Site 73: Camera C1 from floor F8 is now Offline',
    'Site 60: Camera C2 from floor F2 is now Online',
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
    let textColor = item.text.includes('status') ? 'red' : 'white';

    return (
      <a.div style={{ ...style, position: 'absolute', top: 0, color: textColor, margin: '10px'}}>
        {item.text}
      </a.div>
    );
  });

  return (
    <>
      <div className="card" style={{ position: 'relative', height: 250, flex: '1' }}>
        <div style={{ position: 'relative', margin: '10px' }}>Device Status Notifications</div>
        <div style={{ position: 'relative', margin: '10px' }}>{nodes}</div>
      </div>
    </>
  );
};
