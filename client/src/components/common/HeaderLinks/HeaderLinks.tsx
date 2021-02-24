import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { Props, StyleProps, PropsClasses, useStyles } from './headerLinksStyle';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import CustomButton from '../CustomButton/CustomButton';
import CustomDropdown from '../CustomDropdown/CustomDropdown';

import { Apps } from '@material-ui/icons';

const HeaderList: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomButton
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
          href="http://localhost:3000"
        >
          <HomeIcon className={classes.icons} />
          Home
        </CustomButton>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomButton
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
          href="http://localhost:3000/login"
        >
          <GroupIcon className={classes.icons} />
          Login
        </CustomButton>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          caret
          hoverColor="warningHover"
          noLiPadding
          buttonText="Dropdown menu"
          buttonProps={{
            className: classes.navLink,
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              First Option
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Second Option
            </Link>,
          ]}
        />
      </ListItem>
    </List>
  );
};

export default HeaderList;
