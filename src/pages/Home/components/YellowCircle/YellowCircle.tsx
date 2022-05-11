import { Circle } from 'components/Shapes';

import { IDot } from 'domains/Dot';

import styles from './YellowCircle.module.css';

interface IYellowCircleProps {
  center: IDot;
  radius: number;
  area: number;
}

const YellowCircle = ({ center, radius, area }: IYellowCircleProps) => {
  return (
    <>
      <Circle className={styles.circle} center={center} radius={radius} />
      <text className={styles.text} x={center.x} y={center.y} textAnchor="middle">{`A = ${area.toFixed(2)}`}</text>
    </>
  );
};

export default YellowCircle;
