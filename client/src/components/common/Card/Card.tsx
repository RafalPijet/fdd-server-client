import React from 'react';
import classNames from 'classnames';
import { Props, PropsClasses, StyleProps, useStyles } from './CardStyle';

const Card: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const { className, children, plain, carousel, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardCarousel]: carousel,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;
