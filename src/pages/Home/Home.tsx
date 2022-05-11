import { useState } from 'react';

import { ReactComponent as HelpIcon } from 'assets/icons/help.svg';
import { ReactComponent as RestartIcon } from 'assets/icons/restart.svg';

import DrawingBoard from 'components/DrawingBoard';
import IconButton from 'components/IconButton';

import { IDot } from 'domains/Dot';

import BlueParallelogram from './components/BlueParallelogram';
import Help from './components/Help';
import RedCircle from './components/RedCircle';
import YellowCircle from './components/YellowCircle';

import useCalculations from './hooks/useCalculations';

import styles from './Home.module.css';

const MAX_DOTS_QUANTITY = 3;

const Home = () => {
  const [dots, setDots] = useState<IDot[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const { parallelogramVertices, circleRadius, circleDot, parallelogramArea } = useCalculations(dots);

  const handleBoardClick = (x: number, y: number) => {
    if (dots.length === MAX_DOTS_QUANTITY) return;

    const newDot: IDot = { id: new Date().getTime(), x, y };
    setDots([...dots, newDot]);
  };

  const handleReset = () => {
    setDots([]);
  };

  const handleHelpToggle = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const handleRedCircleDrag = (dot: IDot) => {
    const dotIndex = dots.findIndex((value) => value.id === dot.id);
    if (dotIndex >= 0) {
      const updatedDots = dots.map((value, index) => {
        if (index === dotIndex) return dot;
        return value;
      });
      setDots(updatedDots);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <IconButton onClick={handleReset} title="Reset">
          <RestartIcon />
        </IconButton>
        <IconButton onClick={handleHelpToggle} title="Help">
          <HelpIcon />
        </IconButton>
      </div>
      <DrawingBoard onClick={handleBoardClick}>
        {parallelogramVertices.length > 0 && <BlueParallelogram dots={parallelogramVertices} />}
        {circleDot && <YellowCircle center={circleDot} radius={circleRadius} area={parallelogramArea} />}
        {dots.map((dot) => (
          <RedCircle key={dot.id} center={dot} onDrag={handleRedCircleDrag} />
        ))}
      </DrawingBoard>
      {isHelpOpen && <Help onClose={handleHelpToggle} />}
    </div>
  );
};

export default Home;
