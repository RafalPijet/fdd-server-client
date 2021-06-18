import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import Grow from '@material-ui/core/Grow';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import ChildItem from '../../common/ChildItem/ChildItem';
import ChildPresentation from '../../features/ChildPresentation/ChildPresentation';
import {
  getChildrenList,
  getSelectedPerson,
} from '../../../redux/actions/generalActions';
import { getUpdating } from '../../../redux/actions/requestActions';
import { ChildBasicState } from '../../../types/global';
import {
  getChildByIdRequest,
  getChildrenBasicDataRequest,
} from '../../../redux/thunks';
import { useStyles, dummyData } from './ChildrenSectionStyle';

const ChildrenSection: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const childrenList = useSelector(getChildrenList);
  const selectedChild = useSelector(getSelectedPerson);
  const isUpdating = useSelector(getUpdating);
  const [isReady, setIsReady] = useState<boolean>(false);

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

  useEffect(() => {
    setIsReady(selectedChild !== null);
  }, [selectedChild]);

  return (
    <div>
      <Header
        isSpiner={isUpdating}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={isUpdating} />}
        changeColorOnScroll={{
          height: 150,
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
        <GridContainer
          justify="center"
          style={{ height: '2000px' }}
          alignContent="flex-start"
        >
          <GridItem xs={12} sm={12} md={10} style={{ minHeight: '690px' }}>
            <Grow in={isReady} {...(isReady ? { timeout: 1000 } : {})}>
              <div>
                <ChildPresentation
                  selectedChild={
                    selectedChild !== null ? selectedChild : dummyData
                  }
                />
              </div>
            </Grow>
          </GridItem>
          <GridItem
            xs={10}
            sm={10}
            md={10}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {childrenList !== null ? (
              childrenList.map((child: ChildBasicState) => (
                <ChildItem key={child._id} childItem={child} />
              ))
            ) : (
              <Typography>Wczytywanie...</Typography>
            )}
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default ChildrenSection;
