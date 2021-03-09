import React from 'react';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { cleanCurrentUser } from '../../../redux/actions/userActions';
import { Props, StyleProps, PropsClasses, useStyles } from './headerLinksStyle';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';

import { Apps, ExitToApp } from '@material-ui/icons';

const HeaderList: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const { isSpiner } = props;
  const dispatch = useDispatch();
  const listItemClasses = classNames({
    [classes.listItem]: true,
    [classes.disabled]: isSpiner,
  });

  const logoutHandling = () => {
    localStorage.removeItem('tokenFDD');
    localStorage.removeItem('expiresInFDD');
    dispatch(cleanCurrentUser());
  };

  return (
    <List className={classes.list}>
      <ListItem className={listItemClasses}>
        <CustomDropdown
          isDisabled={isSpiner}
          caret
          hoverColor="warningHover"
          noLiPadding
          buttonText="Menu"
          buttonProps={{
            className: classes.navLink,
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/parent" className={classes.dropdownLink}>
              Parent
            </Link>,
            <Link to="/login" className={classes.dropdownLink}>
              Login
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={listItemClasses}>
        <CustomButton
          disabled={isSpiner}
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
          onClick={logoutHandling}
        >
          <Link to="/" style={{ color: 'inherit' }}>
            <ExitToApp className={classes.icons} />
            Wyloguj
          </Link>
        </CustomButton>
      </ListItem>
    </List>
  );
};

export default HeaderList;
