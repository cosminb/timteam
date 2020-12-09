import React from 'react';
import { animated as tanimated, useSpring as tuseSpring } from 'react-spring';

export const Bg = () => {
  const [srings2, setSprings2] = tuseSpring(() => ({
    x: 0,
    y: 0,
  }));

  React.useEffect(() => {
    const animate = () => {
      setSprings2({
        onRest: animate,
        reset: true,

        from: { x: 0, y: 0 },
        to: { x: 50, y: 50 },

        config: {
          frequency: 40,
          damping: 1,
        },
      });
    };

    animate();
  }, []);

  let style = `
  
  .line1 { 
    stroke : #007abc;
    opacity : 0.4;
    stroke-dasharray : 1 1;
  }

  .line2 { 
    stroke :#007abc;
    opacity : 0.2
  }

  .line3 { 
    stroke :#007abc;
    opacity : 0.2
  }
  `;
  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', zIndex: -100 }}>
      <style>{style}</style>
      <pattern width={50} height={50} patternUnits="userSpaceOnUse" id="p1">
        <line x1="0" y1="0" x2="50" y2="0" className="line1" />
        <line x1="0" y1="0" x2="0" y2="50" className="line1" />

        <tanimated.line x1="0" y1={srings2.x} x2="50" y2={srings2.x} className="line2" />
        <tanimated.line x1={srings2.x} y1="0" x2={srings2.x} y2="50" className="line2" />
        <line x1="5" y1="0" x2="5" y2="50" className="line2" />

        <line x1="0" y1="45" x2="50" y2="45" className="line2" />
        <line x1="45" y1="0" x2="45" y2="50" className="line2" />

        <line x1="0" y1="25" x2="50" y2="25" className="line2" />
        <line x1="25" y1="0" x2="25" y2="50" className="line2" />
      </pattern>
      <rect fill="black" x="0" y="0" width="100%" height="100%" />

      <rect fill="url(#p1)" x="0" y="0" width="100%" height="100%" />
    </svg>
  );
};
