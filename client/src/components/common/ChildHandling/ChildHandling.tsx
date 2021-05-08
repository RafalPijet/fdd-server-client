import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import AddingImage from '../AddingImage/AddingImage';
import { getSelectedChild } from '../../../redux/actions/generalActions';
import { getUserChildren, getUser } from '../../../redux/actions/userActions';
import { ChildState } from '../../../types/global';
import RemovingImage from '../RemovingImage/RemovingImage';
import ChildPersonalData from '../ChildPersonalData/ChildPersonalData';
import UserPersonalData from '../UserPersonalData/UserPersonalData';
import AddingInvoices from '../../features/AddingInvoices/AddingInvoices';
import { StyleProps, PropsClasses, useStyles } from './ChildHandlingStyle';

const ChildHandling: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [selectedChild, setSelectedChild] = useState<ChildState | undefined>();
  const childId = useSelector(getSelectedChild);
  const user = useSelector(getUser);
  const children = useSelector(getUserChildren);

  useEffect(() => {
    if (childId !== null) {
      const child = children.find((item: ChildState) => item._id === childId);
      setSelectedChild(child);
    }
  }, [childId]);

  return (
    <div className={classes.root}>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '100%' }}
      >
        <GridItem
          xs={12}
          sm={12}
          lg={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <AddingImage childId={childId} selectedChild={selectedChild} />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          lg={6}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <RemovingImage
            childId={childId}
            imagesUrl={selectedChild !== undefined ? selectedChild.images : []}
          />
        </GridItem>
      </GridContainer>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '65%' }}
      >
        <AddingInvoices childId={childId} selectedChild={selectedChild} />
      </GridContainer>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '75%' }}
      >
        <ChildPersonalData childId={childId} selectedChild={selectedChild} />
      </GridContainer>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '85%' }}
      >
        <UserPersonalData user={user} isAdmin={false} />
      </GridContainer>
    </div>
  );
};

export default ChildHandling;
