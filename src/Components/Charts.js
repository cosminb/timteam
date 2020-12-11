import React from 'react';
import _ from 'lodash';
import { useTransition, a } from 'react-spring';

export const Charts = () => {
  const [type, setType] = React.useState({ i: 0 });

  // const items = React.useMemo(() => {
  let data;

  if (type.i == 0) data = BarChartHoriz();
  else if (type.i == 1) data = BarChartVert();
  else if (type.i == 2) data = PathChart();

  //   return data;
  // }, [type]);
  let items = data;

  let tabs = _.times(3, i => {
    const click = () => setType({ i });
    return <button onClick={click}> chart {i} </button>;
  });

  console.log(items);

  return (
    <div className="details">
      <div>{tabs}</div>

      <GenericChart items={items} />
    </div>
  );
};

const BarChartHoriz = () => {
  let height = 30;
  let size = 60;
  let chartHeight = 400;
  let count = 5;

  //let items = [ { i : 0, value : 45, color : "red"}]
  let items = _.times(count, i => {
    return {
      i,
      value: Math.random() * 200,
      color: Math.random() < 0.5 ? '#007abc' : 'red',
    };
  });

  const offset = chartHeight - size * count;

  let input = _.map(items, (item, i) => {
    return {
      key: 'bar_' + i,
      type: a.rect,
      from: {
        x: 0,
        y: item.i * size + offset,
        width: 0,
        height: height,
        opacity: 0,
      },
      enter: {
        fill: item.color,
        x: 0,
        y: item.i * size + offset,
        width: item.value,
        height,
        opacity: 1,
      },
      update: {
        fill: item.color,
        x: 0,
        y: item.i * size + offset,
        width: item.value,
        height,
        opacity: 1,
      },
      leave: {
        x: 0,
        y: item.i * size + offset,
        width: 0,
        height: height,
        opacity: 0,
      },
    };
  });

  return input;
};
const ChartPath = ({ style }) => {
  return (
    <>
      <linearGradient id="myGradient" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor="red" />
        <stop offset="90%" stopColor="red" stopOpacity="0" />
      </linearGradient>

      <a.path d={style.d} style={style} fill="url(#myGradient)" />
    </>
  );
};
const PathChart = () => {
  let size = 30;
  let cellSize = 60;
  let maxValue = 200;
  let chartHeight = 400;

  //let items = [ { i : 0, value : 45, color : "red"}]
  let items = _.times(10, i => {
    return Math.random() * maxValue;
  });

  let min = _.min(items);
  items[0] = 0;

  let max = _.max(items);
  items[items.length - 1] = 0;

  let pathD = _.map(
    items,
    (y, i) => (i == 0 ? 'M ' : 'L ') + i * size + ' ' + (chartHeight - y)
  ).join(' ');

  //   pathD = 'M 0 400 ' + pathD + ' M 300 400';

  let startD = _.map(items, (y, i) => (i == 0 ? 'M ' : 'L ') + i * size + ' ' + chartHeight).join(
    ' '
  );

  let input = [
    {
      key: 'path_1',
      type: ChartPath,

      from: {
        stroke: 'red',
        d: startD,
        opacity: 0,
      },
      enter: {
        stroke: 'red',
        d: pathD,
        opacity: 1,
      },
      update: {
        stroke: 'red',
        d: pathD,
        opacity: 1,
      },

      leave: {
        stroke: 'red',
        opacity: 0,
        d: startD,
      },
    },
  ];

  return input;
};
const BarChartVert = () => {
  let size = 30;
  let cellSize = 60;
  let maxValue = 200;
  let chartHeight = 400;

  //let items = [ { i : 0, value : 45, color : "red"}]
  let items = _.times(5, i => {
    return {
      i,
      value: Math.random() * maxValue,
      color: Math.random() < 0.5 ? '#007abc' : 'red',
    };
  });

  let input = _.map(items, (item, i) => {
    return {
      key: 'bar_' + i,
      type: a.rect,
      from: {
        y: chartHeight - item.value,
        x: item.i * cellSize,
        width: size,
        height: 0,
        opacity: 0,
      },
      enter: {
        fill: item.color,
        y: chartHeight - item.value,
        x: item.i * cellSize,
        height: item.value,
        width: size,
        opacity: 1,
      },
      update: {
        fill: item.color,
        y: chartHeight - item.value,
        x: item.i * cellSize,
        width: size,
        height: item.value,
        opacity: 1,
      },
      leave: {
        y: chartHeight - item.value,
        x: item.i * cellSize,
        width: size,
        height: 0,
        opacity: 0,
      },
    };
  });

  return input;
};
const GenericChart = ({ items }) => {
  const [transition] = useTransition(
    items,
    {
      enter: item => item.enter || {},
      from: item => item.from || {},

      update: item => item.update || {},
      leave: item => item.leave || {},
      key: item => item.key,
    },
    [items]
  );

  let nodes = transition((style, item, t, i) => {
    return React.createElement(item.type, { key: item.key, style });
  });

  return (
    <svg width="400" height="400">
      {nodes}
    </svg>
  );
};
