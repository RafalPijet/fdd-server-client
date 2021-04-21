import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import ClassNames from 'classnames';
import {
  Props,
  StyleProps,
  useStyles,
  PropsClasses,
} from './DragDropImageItemStyle';

const DragDropImageItem: React.FC<Props> = (props) => {
  const { imageUrl } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isActive, setIsActive] = useState<boolean>(false);
  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.active]: isActive,
  });

  return (
    <Paper variant="outlined" className={rootClasses}>
      <img
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        style={{ width: '100px', height: '66px' }}
        src={imageUrl}
        alt={`child-${imageUrl}`}
      />
    </Paper>
  );
};

export default DragDropImageItem;
