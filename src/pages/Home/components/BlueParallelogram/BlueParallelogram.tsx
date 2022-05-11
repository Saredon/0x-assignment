import { Polygon } from 'components/Shapes';

import { IDot } from 'domains/Dot';

import styles from './BlueParallelogram.module.css';

interface IBlueParallelogramProps {
  dots: IDot[];
}

const BlueParallelogram = ({ dots }: IBlueParallelogramProps) => {
  const lastDot = dots[dots.length - 1];

  return (
    <>
      <Polygon className={styles.polygon} dots={dots} />
      <text
        className={styles.text}
        x={lastDot.x}
        y={lastDot.y + 14}
        textAnchor="middle"
      >{`(${lastDot.x.toFixed()}, ${lastDot.y.toFixed()})`}</text>
    </>
  );
};

export default BlueParallelogram;
