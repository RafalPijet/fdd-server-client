import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Props, StyleProps, PropsClasses, useStyles } from './headerLinksStyle';
import GroupIcon from '@material-ui/icons/Group';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';

import { Apps } from '@material-ui/icons';

const HeaderList: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
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
