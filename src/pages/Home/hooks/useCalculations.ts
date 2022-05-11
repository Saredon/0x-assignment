import { useMemo } from 'react';

import { IDot } from 'domains/Dot';

const MAX_PARALLELOGRAM_DOTS_QUANTITY = 4;

const useCalculations = (dots: IDot[]) => {
  const parallelogramVertices = useMemo(() => {
    if (dots.length !== MAX_PARALLELOGRAM_DOTS_QUANTITY - 1) return [];

    const [firstVertex, middleVertex, lastVertex] = dots;
    const deltaX = lastVertex.x - middleVertex.x;
    const deltaY = lastVertex.y - middleVertex.y;

    const newVertex: IDot = {
      id: new Date().getTime(),
      x: firstVertex.x + deltaX,
      y: firstVertex.y + deltaY,
    };

    return [...dots, newVertex];
  }, [dots]);

  const parallelogramArea = useMemo(() => {
    if (parallelogramVertices.length !== MAX_PARALLELOGRAM_DOTS_QUANTITY) return 0;

    const [firstVertex, middleVertex, lastVertex] = parallelogramVertices;

    const firstDistance = Math.sqrt(
      Math.pow(firstVertex.x - middleVertex.x, 2) + Math.pow(firstVertex.y - middleVertex.y, 2),
    );
    const secondDistance = Math.sqrt(
      Math.pow(lastVertex.x - middleVertex.x, 2) + Math.pow(lastVertex.y - middleVertex.y, 2),
    );
    const diagonalDistance = Math.sqrt(
      Math.pow(lastVertex.x - firstVertex.x, 2) + Math.pow(lastVertex.y - firstVertex.y, 2),
    );

    const triangleHalfPerimeter = (firstDistance + secondDistance + diagonalDistance) / 2;
    const triangleArea = Math.sqrt(
      triangleHalfPerimeter *
        (triangleHalfPerimeter - firstDistance) *
        (triangleHalfPerimeter - secondDistance) *
        (triangleHalfPerimeter - diagonalDistance),
    );

    return triangleArea * 2;
  }, [parallelogramVertices]);

  const circleRadius = useMemo(() => {
    return Math.sqrt(parallelogramArea / Math.PI);
  }, [parallelogramArea]);

  const circleDot: IDot | null = useMemo(() => {
    if (parallelogramVertices.length !== MAX_PARALLELOGRAM_DOTS_QUANTITY) return null;

    const firstVertex = parallelogramVertices[0];
    const oppositeVertex = parallelogramVertices[2];

    return {
      id: new Date().getTime(),
      x: firstVertex.x + (oppositeVertex.x - firstVertex.x) / 2,
      y: firstVertex.y + (oppositeVertex.y - firstVertex.y) / 2,
    };
  }, [parallelogramVertices]);

  return {
    parallelogramVertices,
    parallelogramArea,
    circleRadius,
    circleDot,
  };
};

export default useCalculations;
