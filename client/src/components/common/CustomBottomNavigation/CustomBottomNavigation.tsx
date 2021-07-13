import React from 'react';
import classNames from 'classnames';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useStyles } from './CustomBottomNavigationStyle';

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

const CustomBottomNavigation: React.FC<NaviProps> = (props) => {
  const { disabled, onChange, value, items } = props;
  const classes = useStyles();
  const buttonClasses = classNames({
    [classes.busy]: disabled,
    [classes.normal]: true,
  });

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
            classes={{
              selected: buttonClasses,
              wrapper: buttonClasses,
            }}
          />
        );
      })}
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
