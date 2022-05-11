import { MouseEventHandler, TouchEventHandler, useState } from 'react';

import { Circle } from 'components/Shapes';

import { IDot } from 'domains/Dot';

import styles from './RedCircle.module.css';

interface IRedCircleProps {
  center: IDot;
  onDrag?: (dot: IDot) => void;
}

const RED_CIRCLE_RADIUS = 5.5;

const RedCircle = ({ center, onDrag }: IRedCircleProps) => {
  const [position, setPosition] = useState({
    ...center,
    active: false,
  });

  const handleStart = () => {
    setPosition({
      ...position,
      active: true,
    });
  };

  const handleMove = (x: number, y: number) => {
    if (position.active) {
      setPosition({ ...position, x, y });
      if (onDrag) {
        onDrag({ id: center.id, x, y });
      }
    }
  };

  const handleMouseMove: MouseEventHandler<SVGCircleElement> = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    handleMove(x, y);
  };

  const handleTouchMove: TouchEventHandler<SVGCircleElement> = (event) => {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    handleMove(x, y);
  };

  const handleEnd = () => {
    setPosition({
      ...position,
      active: false,
    });
  };

  return (
    <>
      <text
        className={styles.text}
        x={center.x}
        y={center.y + 14 + RED_CIRCLE_RADIUS}
        textAnchor="middle"
      >{`(${center.x.toFixed()}, ${center.y.toFixed()})`}</text>
      <Circle
        className={styles.circle}
        center={position}
        radius={RED_CIRCLE_RADIUS}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      />
      {position.active && (
        <Circle
          className={styles.fakeCircle}
          center={position}
          radius={RED_CIRCLE_RADIUS * 50}
          onMouseDown={handleStart}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
        />
      )}
    </>
  );
};

export default RedCircle;
