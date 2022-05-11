import { HTMLAttributes } from 'react';

import styles from './IconButton.module.css';

const IconButton = ({ children, className, ...rest }: HTMLAttributes<HTMLButtonElement>) => {
  const classNames = [styles.iconButton, className].join(' ');

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
