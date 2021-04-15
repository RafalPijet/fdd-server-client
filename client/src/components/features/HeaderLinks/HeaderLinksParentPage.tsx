import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Props, StyleProps, PropsClasses, useStyles } from './headerLinksStyle';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';
import { setIsOpen } from '../../../redux/actions/generalActions';
import { getUserChildren } from '../../../redux/actions/userActions';
import { ChildState } from '../../../types/global';
import { Face, ExitToApp } from '@material-ui/icons';

const HeaderList: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const { isSpiner } = props;
  const listItemClasses = classNames({
    [classes.listItem]: true,
    [classes.disabled]: isSpiner,
  });
  const children = useSelector(getUserChildren);
  const dispatch = useDispatch();

  const choiceChildHandling = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(e.currentTarget.id);
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
            id={`child-${item._id}`}
            onClick={choiceChildHandling}
          >
            {item.firstName} {item.lastName}
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
        <CustomDropdown
          isDisabled={isSpiner}
          caret
          hoverColor="primaryHover"
          noLiPadding
          buttonText="Podopieczny"
          buttonProps={{
            className: classes.navLink,
          }}
          buttonIcon={Face}
          dropdownList={childrenItems()}
        />
      </ListItem>
      <ListItem className={listItemClasses}>
        <CustomButton
          disabled={isSpiner}
          setColor="transparent"
          setSize="md"
          className={classes.navLink}
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
