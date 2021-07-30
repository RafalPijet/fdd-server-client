import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link as LinkScroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import {
  Face,
  ExitToApp,
  AddAPhoto,
  Telegram,
  PhotoLibrary,
  HowToReg,
  Build,
  Home,
} from '@material-ui/icons';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';
import {
  setIsOpen,
  setSelectedChild,
  setEventChange,
  setUserToast,
  setModalAreYouSure,
} from '../../../redux/actions/generalActions';
import {
  getUserChildren,
  cleanCurrentUser,
} from '../../../redux/actions/userActions';
import { loadUserMessages } from '../../../redux/actions/messageActions';
import { resetMessagesRequest } from '../../../redux/actions/requestActions';
import {
  ChildState,
  AvailableDestinations,
  ModalAYSModes,
} from '../../../types/global';
import { clearTimer } from '../../../redux/thunks';
import { clearLocalStorage } from '../../../types/functions';
import { Props, useStyles } from './headerLinksStyle';

const HeaderList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { isSpiner } = props;
  const listItemClasses = classNames({
    [classes.listItem]: true,
    [classes.disabled]: isSpiner,
  });
  const children = useSelector(getUserChildren);
  const dispatch = useDispatch();

  const logoutHandling = () => {
    clearTimer();
    clearLocalStorage();
    dispatch(cleanCurrentUser());
    dispatch(resetMessagesRequest());
    dispatch(setSelectedChild(null));
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

  const choiceChildHandling = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(setSelectedChild(e.currentTarget.id));
    dispatch(setIsOpen(false));
  };

  const scrollLinkHandling = (name: AvailableDestinations) => {
    dispatch(
      setEventChange({
        isAction: true,
        data: {
          actionName: name,
        },
      })
    );
    dispatch(setIsOpen(false));
  };

  const childrenItems = () => {
    const buttons: any[] = [];
    if (children.length) {
      children.forEach((item: ChildState) => {
        buttons.push(
          <CustomButton
            setSize="sm"
            style={{ width: '100%' }}
            setColor="primary"
            id={item._id}
            onClick={choiceChildHandling}
          >
            <Avatar
              src={item.avatar}
              alt={`${item.firstName} ${item.lastName}`}
              className={classes.avatar}
              variant="rounded"
            />
            <span>
              {item.firstName} {item.lastName}
            </span>
          </CustomButton>
        );
      });
    } else {
      buttons.push(
        <CustomButton
          setColor="primary"
          setSize="sm"
          onClick={() => dispatch(setIsOpen(false))}
        >
          Nie przydzielono
        </CustomButton>
      );
    }
    return buttons;
  };

  return (
    <List className={classes.list}>
      <ListItem className={listItemClasses}>
        <CustomButton
          disabled={isSpiner}
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
        >
          <LinkScroll
            to={AvailableDestinations.mainParent}
            smooth={true}
            spy={true}
            onClick={() => scrollLinkHandling(AvailableDestinations.mainParent)}
          >
            <Home className={classes.icons} />
            Wiadomości
          </LinkScroll>
        </CustomButton>
      </ListItem>
      <ListItem className={listItemClasses}>
        <CustomDropdown
          isDisabled={isSpiner}
          caret
          hoverColor="primaryHover"
          noLiPadding
          buttonText="Wykonaj"
          buttonProps={{
            className: classes.navLink,
          }}
          buttonIcon={<Build />}
          dropdownList={[
            <LinkScroll
              to={AvailableDestinations.addingImage}
              className={classes.linkScroll}
              smooth={true}
              spy={true}
              offset={-80}
              onClick={() =>
                scrollLinkHandling(AvailableDestinations.addingImage)
              }
            >
              <AddAPhoto className={classes.icons} />
              Dodaj zdjęcie / portret
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.removingImage}
              className={classes.linkScroll}
              smooth={true}
              spy={true}
              offset={-80}
              onClick={() =>
                scrollLinkHandling(AvailableDestinations.removingImage)
              }
            >
              <PhotoLibrary className={classes.icons} />
              Usuń zdjęcie / zmień kolejność
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.addingInvoice}
              className={classes.linkScroll}
              smooth={true}
              spy={true}
              offset={-80}
              onClick={() =>
                scrollLinkHandling(AvailableDestinations.addingInvoice)
              }
            >
              <Telegram className={classes.icons} />
              Wyślij fakturę
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.childData}
              className={classes.linkScroll}
              smooth={true}
              spy={true}
              offset={-80}
              onClick={() =>
                scrollLinkHandling(AvailableDestinations.childData)
              }
            >
              <Face className={classes.icons} />
              Dodaj / edytuj dane dziecka
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.userData}
              className={classes.linkScroll}
              smooth={true}
              spy={true}
              offset={-80}
              onClick={() => scrollLinkHandling(AvailableDestinations.userData)}
            >
              <HowToReg className={classes.icons} />
              Edytuj dane rodzica
            </LinkScroll>,
          ]}
        />
      </ListItem>
      <ListItem className={listItemClasses}>
        <CustomDropdown
          isDisabled={isSpiner}
          caret
          hoverColor="primaryHover"
          noLiPadding
          buttonText="Podopieczny"
          buttonProps={{
            className: classes.navLink,
          }}
          buttonIcon={<Face />}
          dropdownList={childrenItems()}
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
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <ExitToApp className={classes.icons} />
            Wyloguj
          </Link>
        </CustomButton>
      </ListItem>
    </List>
  );
};

export default HeaderList;
