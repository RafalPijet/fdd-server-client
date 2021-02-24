import React from 'react';
import classNames from 'classnames';
import { Props, PropsClasses, StyleProps, useStyles } from './CardHeaderStyle';

const CardHeader: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const { className, color, plain, children, ...rest } = props;

  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color]]: color,
    [classes.cardHeaderPlain]: plain,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardHeader;
