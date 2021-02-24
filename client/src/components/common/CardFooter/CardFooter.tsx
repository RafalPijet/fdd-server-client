import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

interface StyleProps {
  cardFooter: BaseCSSProperties;
}

interface Props {
  className: string;
  children: ReactNode;
}

const cardFooterStyle = (theme: Theme) => ({
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '0.9375rem 1.875rem',
  },
});

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(cardFooterStyle as any);

const CardFooter: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
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
