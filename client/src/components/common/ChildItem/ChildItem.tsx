import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import {
  getSelectedChild,
  setSelectedChild,
  setSelectedPerson,
} from '../../../redux/actions/generalActions';
import { getUpdating } from '../../../redux/actions/requestActions';
import { getChildByIdRequest } from '../../../redux/thunks';
import { useStyles, Props } from './ChildItemStyle';

const ChildItem: React.FC<Props> = (props) => {
  const { childItem } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedChild = useSelector(getSelectedChild);
  const isUpdating = useSelector(getUpdating);

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.active]: childItem._id === selectedChild,
    [classes.disabled]: isUpdating,
  });

  const clickElementHandling = () => {
    if (!isUpdating) {
      dispatch(setSelectedChild(childItem._id));
      //   dispatch(setSelectedPerson(null));
      //   dispatch(getChildByIdRequest(childItem._id));
    }
  };

  return (
    <Paper
      elevation={childItem._id === selectedChild ? 3 : 20}
      className={rootClasses}
      onClick={clickElementHandling}
    >
      <GridContainer>
        <GridItem xs={3} sm={3} md={3}>
          <Avatar
            variant="rounded"
            src={childItem.avatar}
            alt={`${childItem.name}`}
            className={classes.avatar}
          />
        </GridItem>
        <GridItem
          xs={9}
          sm={9}
          md={9}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography className={classes.names}>{childItem.name}</Typography>
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default ChildItem;
