import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import IconButton from 'components/IconButton';

import styles from './Help.module.css';

interface IHelpProps {
  onClose: () => void;
}

const Help = ({ onClose }: IHelpProps) => {
  return (
    <div className={styles.root}>
      <IconButton className={styles.closeButton} onClick={onClose} title="Close">
        <CloseIcon />
      </IconButton>
      <div className={styles.info}>
        <h2>How it works</h2>
        <p>Click on visible area will create a point (Red dot). Every dot can be dragged to change it's coordinates.</p>
        <p>
          After you chose three points it will draw a parallelogram and yellow circle. These shapes has same center
          coordinates and area, which will be displayed in the center of shapes.
        </p>
        <p>If you want to reset all points, click the button on the top right side of the view.</p>
      </div>
    </div>
  );
};

export default Help;
