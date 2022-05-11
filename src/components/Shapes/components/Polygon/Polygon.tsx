import { useMemo } from 'react';

import { IDot } from 'domains/Dot';

interface IPolygonProps {
  className: string;
  dots: IDot[];
}

const Polygon = ({ className, dots }: IPolygonProps) => {
  const points = useMemo(() => {
    return dots.map((dot) => `${dot.x},${dot.y}`).join(' ');
  }, [dots]);

  return <polygon className={className} points={points} />;
};

export default Polygon;
