import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import ClassNames from 'classnames';
import { Props, useStyles } from './DragDropImageItemStyle';

const DragDropImageItem: React.FC<Props> = (props) => {
  const { imageUrl, isDisabled } = props;
  const classes = useStyles();
  const [isActive, setIsActive] = useState<boolean>(false);
  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.active]: isActive,
  });
  const imageClasses = ClassNames({
    [classes.image]: true,
    [classes.disabled]: isDisabled,
  });

  return (
    <Paper variant="outlined" className={rootClasses}>
      <img
        onMouseEnter={() => !isDisabled && setIsActive(true)}
        onMouseLeave={() => !isDisabled && setIsActive(false)}
        className={imageClasses}
        src={imageUrl}
        alt={`child-${imageUrl}`}
      />
    </Paper>
  );
};

export default DragDropImageItem;
