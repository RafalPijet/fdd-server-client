import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import { getChildrenList } from '../../../redux/actions/generalActions';
import {
  getChildByIdRequest,
  getChildrenBasicDataRequest,
} from '../../../redux/thunks';
import { useStyles } from './ChildrenSectionStyle';

const ChildrenSection: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const childrenList = useSelector(getChildrenList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (childrenList !== null) {
      dispatch(getChildByIdRequest(childrenList[0]._id));
    } else {
      dispatch(getChildrenBasicDataRequest(0, 15));
    }
  }, [childrenList]);

  return (
    <div>
      <Header
        isSpiner={false}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={false} />}
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.titlePage}>
            Podopieczni
          </Typography>
        </div>
      </div>
      <div className={ClassNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center" style={{ height: '2000px' }}>
          <GridItem xs={12} sm={12} md={10}>
            Carousel
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            List
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default ChildrenSection;
