import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { grayColor } from '../../../styles/globalStyles';

export interface ItemNaviProps {
  label: string;
  value: any;
  icon: React.ReactNode;
}

export interface NaviProps {
  disabled: boolean;
  onChange: (event: React.ChangeEvent<{}>, value: any) => void | undefined;
  value: any;
  items: ItemNaviProps[];
}

const navigationStyle = (theme: Theme) => ({
  selectTab: {
    paddingTop: '5px',
    fontSize: '.75rem !important',
    color: '#fff',
  },
  busy: {
    color: `${grayColor} !important`,
  },
  normal: {
    color: '#fff',
  },
});

interface StyleProps {
  selectTab: BaseCSSProperties;
  busy: BaseCSSProperties;
  normal: BaseCSSProperties;
}

const useStyles = makeStyles(navigationStyle as any);
type PropsClasses = Record<keyof StyleProps, string>;

const CustomBottomNavigation: React.FC<NaviProps> = (props) => {
  const { disabled, onChange, value, items } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);

  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      style={{ backgroundColor: 'transparent' }}
    >
      {items.map((item: ItemNaviProps, index: number) => {
        return (
          <BottomNavigationAction
            key={index}
            value={item.value}
            label={item.label}
            icon={item.icon}
            disabled={disabled}
            style={{ color: classes.normal }}
            classes={{
              selected: classes.selectTab,
            }}
            className={disabled ? classes.busy : ''}
          />
        );
      })}
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
