import React from 'react';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link as LinkScroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import GroupIcon from '@material-ui/icons/Group';
import { Apps } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import TelegramIcon from '@material-ui/icons/Telegram';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';
import { setIsOpen } from '../../../redux/actions/generalActions';
import { AvailableDestinations } from '../../../types/global';
import { Props, useStyles } from './headerLinksStyle';

const HeaderList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSpiner } = props;
  const listItemClasses = classNames({
    [classes.listItem]: true,
    [classes.disabled]: isSpiner,
  });
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
            <LinkScroll
              to={AvailableDestinations.mainPage}
              smooth={true}
              spy={true}
              onClick={() => dispatch(setIsOpen(false))}
              className={classes.linkScroll}
            >
              <HomeIcon className={classes.icons} />
              Home
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.news}
              smooth={true}
              spy={true}
              offset={-70}
              onClick={() => dispatch(setIsOpen(false))}
              className={classes.linkScroll}
            >
              <ChatIcon className={classes.icons} />
              Aktualności
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.children}
              smooth={true}
              spy={true}
              offset={-80}
              onClick={() => dispatch(setIsOpen(false))}
              className={classes.linkScroll}
            >
              <FaceIcon className={classes.icons} />
              Podopieczni
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.outsideMessage}
              smooth={true}
              spy={true}
              onClick={() => dispatch(setIsOpen(false))}
              className={classes.linkScroll}
            >
              <TelegramIcon className={classes.icons} />
              Napisz do nas
            </LinkScroll>,
            <LinkScroll
              to={AvailableDestinations.reports}
              smooth={true}
              spy={true}
              onClick={() => dispatch(setIsOpen(false))}
              className={classes.linkScroll}
            >
              <DescriptionIcon className={classes.icons} />
              Sprawozdania
            </LinkScroll>,
          ]}
        />
      </ListItem>
      <ListItem className={listItemClasses}>
        <CustomButton
          disabled={isSpiner}
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
        >
          <Link to="/login" style={{ color: 'inherit' }}>
            <GroupIcon className={classes.icons} />
            Zaloguj
          </Link>
        </CustomButton>
      </ListItem>
    </List>
  );
};

export default HeaderList;
