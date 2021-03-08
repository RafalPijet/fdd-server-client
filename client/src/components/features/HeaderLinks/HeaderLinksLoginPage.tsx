import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Props, StyleProps, PropsClasses, useStyles } from './headerLinksStyle';
import HomeIcon from '@material-ui/icons/Home';
import CustomButton from '../../common/CustomButton/CustomButton';

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
        <CustomButton
          disabled={isSpiner}
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
        >
          <Link to="/" style={{ color: 'inherit' }}>
            <HomeIcon className={classes.icons} />
            Powrót
          </Link>
        </CustomButton>
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
