import React from 'react';
import { useSelector } from 'react-redux';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Paper from '@material-ui/core/Paper';
import ChildrenZone from '../../features/ChildrenZone/ChildrenZone';
import ShowUserData from '../../features/ShowUserData/ShowUserData';
import RemovingImage from '../../common/RemovingImage/RemovingImage';
import AddingImage from '../../common/AddingImage/AddingImage';
import ChildPersonalData from '../../common/ChildPersonalData/ChildPersonalData';
import UserPersonalData from '../../common/UserPersonalData/UserPersonalData';
import AdminContentHeader from '../../common/AdminContentHeader/AdminContentHeader';
import {
  getSelectedUserType,
  getSelectedPerson,
  getSelectedChild,
} from '../../../redux/actions/generalActions';
import {
  SearchUserType,
  ChildState,
  UserState,
  AvailableDestinations,
} from '../../../types/global';
import { StyleProps, PropsClasses, useStyles } from './AdminContentStyle';

const AdminContent: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const childId = useSelector(getSelectedChild);
  const userType = useSelector(getSelectedUserType);
  const selectedPerson = useSelector(getSelectedPerson);
  const selectedChild = selectedPerson as ChildState;
  const selectedUser = selectedPerson as UserState;

  return (
    <div className={classes.root}>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '100%' }}
      >
        {userType === SearchUserType.child &&
          (selectedChild !== null ? (
            <>
              <GridItem xs={12} sm={12} lg={8} style={{ maxWidth: '770px' }}>
                <Paper elevation={6} className={classes.childZone}>
                  <ChildrenZone childData={selectedChild} />
                </Paper>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                lg={6}
                id={AvailableDestinations.removingImage}
              >
                <RemovingImage
                  childId={childId}
                  imagesUrl={selectedChild !== null ? selectedChild.images : []}
                  name={AvailableDestinations.removingImage}
                />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                lg={12}
                style={{ display: 'flex', justifyContent: 'center' }}
                id={AvailableDestinations.addingImage}
              >
                <AddingImage
                  childId={childId}
                  selectedChild={
                    selectedChild !== null ? selectedChild : undefined
                  }
                  name={AvailableDestinations.addingImage}
                />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                lg={10}
                id={AvailableDestinations.childData}
              >
                <ChildPersonalData
                  childId={childId}
                  selectedChild={
                    selectedChild !== null ? selectedChild : undefined
                  }
                  name={AvailableDestinations.childData}
                  isOnlyEdit={true}
                  infoText="Włącz/Wyłącz sekcję edycji danych podopiecznego."
                  helpText="W tej sekcji mozesz edytować dane podopiecznego aktualnie
          wybranego. Wprowadź dane w odpowiednie pola formularza, a następnie kliknij przycisk
           AKTUALIZUJ DANE."
                />
              </GridItem>
            </>
          ) : (
            <AdminContentHeader userType={userType} />
          ))}
        {(userType === SearchUserType.parent ||
          userType === SearchUserType.admin) &&
          (selectedUser !== null ? (
            <>
              <GridItem xs={12} sm={12} lg={12}>
                <ShowUserData user={selectedUser} />
              </GridItem>
              {userType === SearchUserType.parent && (
                <GridItem xs={12} sm={12} lg={12}>
                  <ChildPersonalData
                    childId={null}
                    userId={selectedUser._id}
                    selectedChild={undefined}
                    name={AvailableDestinations.childData}
                    isOnlyEdit={false}
                    infoText="Włącz/Wyłącz sekcję dodania podopiecznego."
                    helpText="W tej sekcji mozesz dodać nowego podopiecznego. 
                  Wprowadź dane w odpowiednie pola formularza, a następnie kliknij przycisk
          DODAJ PODOPIECZNEGO."
                  />
                </GridItem>
              )}
              <GridItem xs={12} sm={12} lg={12}>
                <UserPersonalData
                  isAdmin={true}
                  user={selectedUser}
                  name={AvailableDestinations.userData}
                />
              </GridItem>
            </>
          ) : (
            <AdminContentHeader userType={userType} />
          ))}
      </GridContainer>
    </div>
  );
};

export default AdminContent;