import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useStyles } from './CardFooterStyle';

interface Props {
  className: string;
  children: ReactNode;
}

const CardFooter: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { className, children, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: className !== undefined,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardFooter;
