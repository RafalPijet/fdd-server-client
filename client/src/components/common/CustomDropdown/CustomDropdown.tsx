import React, { useState } from 'react';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Icon from '@material-ui/core/Icon';
import Popper from '@material-ui/core/Popper';
import CustomButton from '../CustomButton/CustomButton';
import {
  PropsClasses,
  useStyles,
  Props,
  StyleProps,
} from './CustomDropdownStyle';

const CustomDropdown = (props: Props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    caret,
    hoverColor,
    rtlActive,
    noLiPadding,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretActive]: Boolean(anchorEl),
    [classes.caretRTL]: rtlActive,
  });

  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor]]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
  });
  let icon = null;
  switch (typeof buttonIcon) {
    case 'object':
      icon = <props.buttonIcon className={classes.buttonIcon} />;
      break;
    case 'string':
      icon = <Icon className={classes.buttonIcon}>{props.buttonIcon}</Icon>;
      break;
    default:
      icon = null;
      break;
  }
  return (
    <div>
      <div>
        <CustomButton
          setSize="md"
          setColor="transparent"
          aria-label="Notifications"
          aria-owns={anchorEl ? 'menu-list' : undefined}
          aria-haspopup="true"
          {...buttonProps}
          onClick={handleClick}
        >
          {icon}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <b className={caretClasses} /> : null}
        </CustomButton>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.popperResponsive]: true,
        })}
      >
        <Grow in={Boolean(anchorEl)}>
          <Paper className={classes.dropdown}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <MenuList role="menu" className={classes.menuList}>
                {dropdownList.map((item: React.ReactNode, index: number) => {
                  return (
                    <MenuItem divider key={index} className={dropdownItem}>
                      {item}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      </Popper>
    </div>
  );
};

export default CustomDropdown;
