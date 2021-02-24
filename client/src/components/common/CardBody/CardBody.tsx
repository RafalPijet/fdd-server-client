import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

interface StyleProps {
  cardBody: BaseCSSProperties;
}

interface Props {
  className?: string;
  children: ReactNode;
}

const cardBodyStyle = (theme: Theme) => ({
  cardBody: {
    padding: '0.9375rem 1.875rem',
    flex: '1 1 auto',
  },
});

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(cardBodyStyle as any);

const CardBody: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
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
