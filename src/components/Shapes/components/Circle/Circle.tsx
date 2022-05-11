import { HTMLAttributes } from 'react';

import { IDot } from 'domains/Dot';

interface ICircleProps extends HTMLAttributes<SVGCircleElement> {
  className?: string;
  center: Pick<IDot, 'x' | 'y'>;
  radius: number;
}

const Circle = ({ className, center, radius, ...rest }: ICircleProps) => {
  return <circle className={className} cx={center.x} cy={center.y} r={radius} {...rest}></circle>;
};

export default Circle;
