import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import {
  PropsClasses,
  StyleProps,
  Props,
  useStyles,
} from './CustomButtonStyle';

const CustomButton: React.FC<Props> = (props) => {
  const {
    setColor,
    setSize,
    simple,
    round,
    fullWidth,
    disabled,
    block,
    link,
    justIcon,
    children,
    className,
    ...rest
  } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[setSize]]: setSize,
    [classes[setColor]]: setColor,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });

  return (
    <Button {...rest} className={btnClasses}>
      {children}
    </Button>
  );
};

export default CustomButton;
