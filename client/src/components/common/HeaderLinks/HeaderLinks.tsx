import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CustomButton from '../CustomButton/CustomButton';
import { Props, StyleProps, PropsClasses, useStyles } from './headerLinksStyle';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';

const HeaderList: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomButton
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
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
        >
          <GroupIcon className={classes.icons} />
          Second menu
        </CustomButton>
      </ListItem>
    </List>
  );
};

export default HeaderList;
