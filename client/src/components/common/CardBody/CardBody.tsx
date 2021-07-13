import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useStyles } from './CardBodyStyle';

interface Props {
  className?: string;
  children: ReactNode;
}

const CardBody: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { className, children, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className!]: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
