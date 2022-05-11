import { useEffect, useRef, useState, ReactNode, MouseEvent } from 'react';

interface IDrawingBoardProps {
  children: ReactNode;
  onClick: (x: number, y: number) => void;
}

const DrawingBoard = ({ children = null, onClick }: IDrawingBoardProps) => {
  const [viewBox, setViewBox] = useState({ width: 0, height: 0 });
  const delayedResizeRef = useRef<null | NodeJS.Timeout>(null);

  const parseViewBoxSize = () => {
    setViewBox({ width: window.innerWidth, height: window.innerHeight });
  };

  const handleResizeViewport = () => {
    if (delayedResizeRef.current) {
      clearTimeout(delayedResizeRef.current);
    }
    delayedResizeRef.current = setTimeout(parseViewBoxSize, 100);
  };

  const handleClick = (event: MouseEvent<SVGElement>) => {
    onClick(event.clientX, event.clientY);
  };

  useEffect(() => {
    parseViewBoxSize();

    window.addEventListener('resize', handleResizeViewport);
    return () => {
      window.removeEventListener('resize', handleResizeViewport);
    };
  }, []);

  return (
    <svg id="drawing_board" viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} onClick={handleClick}>
      {children}
    </svg>
  );
};

export default DrawingBoard;
