import React from 'react';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { cleanCurrentUser } from '../../../redux/actions/userActions';
import { resetMessagesRequest } from '../../../redux/actions/requestActions';
import {
  setSelectedChild,
  setSelectedPerson,
  setSelectedUserType,
  setSelectedQuantity,
  setUserToast,
  setModalAreYouSure,
} from '../../../redux/actions/generalActions';
import { loadUserMessages } from '../../../redux/actions/messageActions';
import { SearchUserType, ModalAYSModes } from '../../../types/global';
import { Props, useStyles } from './headerLinksStyle';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';

import { Apps, ExitToApp } from '@material-ui/icons';

const HeaderList: React.FC<Props> = (props) => {
  const classes = useStyles();
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
    dispatch(resetMessagesRequest());
    dispatch(setSelectedChild(null));
    dispatch(setSelectedPerson(null));
    dispatch(setSelectedQuantity(null));
    dispatch(setSelectedUserType(SearchUserType.child));
    dispatch(loadUserMessages([], 0));
    dispatch(
      setUserToast({
        isOpen: false,
        content: '',
        variant: 'success',
      })
    );
    dispatch(
      setModalAreYouSure({
        mode: ModalAYSModes.null,
        isOpen: false,
        title: '',
        description: '',
        data: {},
      })
    );
  };

  return (
    <List className={classes.list}>
      <ListItem className={listItemClasses}>
        <CustomDropdown
          isDisabled={isSpiner}
          caret
          hoverColor="primaryHover"
          noLiPadding
          buttonText="Menu"
          buttonProps={{
            className: classes.navLink,
          }}
          buttonIcon={<Apps />}
          dropdownList={[
            <Link to="/admin" className={classes.dropdownLink}>
              Home
            </Link>,
            <Link to="/admin/news" className={classes.dropdownLink}>
              Aktualności
            </Link>,
            <Link to="/admin/reports" className={classes.dropdownLink}>
              Sprawozdania
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
