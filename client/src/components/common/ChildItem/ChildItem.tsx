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
} from '../../../redux/actions/generalActions';
import { getUpdating } from '../../../redux/actions/requestActions';
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
    }
  };

  return (
    <GridItem
      xs={6}
      sm={4}
      md={3}
      lg={2}
      style={{ display: 'flex', justifyContent: 'center', padding: '0 2px' }}
    >
      <Paper
        elevation={childItem._id === selectedChild ? 3 : 20}
        className={rootClasses}
        onClick={clickElementHandling}
      >
        <GridContainer>
          <GridItem xs={12} sm={6} md={4} lg={3}>
            <Avatar
              variant="rounded"
              src={childItem.avatar}
              alt={`${childItem.name}`}
              className={classes.avatar}
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={6}
            md={8}
            lg={9}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography className={classes.names}>{childItem.name}</Typography>
          </GridItem>
        </GridContainer>
      </Paper>
    </GridItem>
  );
};

export default ChildItem;
