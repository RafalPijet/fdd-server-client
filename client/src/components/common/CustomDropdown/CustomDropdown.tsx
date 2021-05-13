import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import CustomButton from '../CustomButton/CustomButton';
import { setIsOpen, getIsOpen } from '../../../redux/actions/generalActions';
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
    isDisabled,
  } = props;
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (anchorEl !== null && !isOpen) {
      handleClickAway();
    }
  }, [isOpen]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    dispatch(setIsOpen(true));
  };

  const handleClickAway = () => {
    setAnchorEl(null);
    dispatch(setIsOpen(false));
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

  return (
    <div>
      <div>
        <CustomButton
          disabled={isDisabled}
          setSize="md"
          setColor="transparent"
          aria-label="Notifications"
          aria-owns={anchorEl ? 'menu-list' : undefined}
          aria-haspopup="true"
          {...buttonProps}
          onClick={handleClick}
        >
          {buttonIcon}
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
