import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Props, StyleProps, PropsClasses, useStyles } from './headerLinksStyle';
import HomeIcon from '@material-ui/icons/Home';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';

import { Apps } from '@material-ui/icons';

const HeaderLinks: React.FC<Props> = (props) => {
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
      <ListItem className={listItemClasses}>
        <CustomButton
          disabled={isSpiner}
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
          href="http://localhost:3000"
        >
          <HomeIcon className={classes.icons} />
          Home
        </CustomButton>
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
