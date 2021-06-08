import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import AddingImage from '../AddingImage/AddingImage';
import { getSelectedChild } from '../../../redux/actions/generalActions';
import { getUserChildren, getUser } from '../../../redux/actions/userActions';
import { ChildState, AvailableDestinations } from '../../../types/global';
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
          id={AvailableDestinations.addingImage}
        >
          <AddingImage
            childId={childId}
            selectedChild={selectedChild}
            name={AvailableDestinations.addingImage}
            helpText="Aby dodać zdjęcie, upuść je lub kliknij w celu wyboru zdjęcia z Twojego dysku.
            Następnie klikając przycisk DODAJ ZDJĘCIE, przenosisz je do pola edytora, natomiast klikając X,
             wracasz do mozliwości dodania innego zdjęcia. Suwakiem PORTRET ustalasz, czy będziesz dodawać 
             portret - miniaturkę dziecka czy jedno z 5-ciu zdjęć kolekcji. Standardowo ustawiona jest
              opcja dodawania zdjęć kolekcji. W edytorze powinieneś wykadrować docelowe zdjęcię.
               Ramka kadrowania jest inna dla zdjęcia niz dla portretu. Uzywając przycisków edytora mozesz
               zblizać, oddalać, obracać oraz przesuwać obrabiane zdjęcie. Jeśli chcesz cofnąć zmiany podczas
               kadrowania, naciśnij przycisk z ikoną prostokąta z krzyzykiem. Jeśli wykadrowałeś w sposób zadowalający
                Cię naciśnij przycisk z ikoną aparatu fotograficznego. Zobaczysz wówczas gotowe zdjęcie. Mozesz oczywiście ponownie wrócić do kadrowania zdjęcia, czy portetu.
                 Po naciśnięciu przycisku ZAPISZ ZDJĘCIE nastąpi dodanie zdjęcia do kolekcji lub portretu.
                 Pamiętaj, ze w kolekcji mozesz mieć tylko 5 zdjęć! Naciśnięcia przycisku ANULUJ
                 likwiduje cały proces dodawania nowego zdjęcia."
            isExistChild={true}
            isAvatarAvailable={true}
          />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          lg={6}
          style={{ display: 'flex', justifyContent: 'center' }}
          id={AvailableDestinations.removingImage}
        >
          <RemovingImage
            childId={childId}
            imagesUrl={selectedChild !== undefined ? selectedChild.images : []}
            name={AvailableDestinations.removingImage}
          />
        </GridItem>
      </GridContainer>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '65%' }}
        id={AvailableDestinations.addingInvoice}
      >
        <AddingInvoices
          childId={childId}
          name={AvailableDestinations.addingInvoice}
        />
      </GridContainer>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '75%' }}
        id={AvailableDestinations.childData}
      >
        <ChildPersonalData
          childId={childId}
          selectedChild={selectedChild}
          name={AvailableDestinations.childData}
          infoText="Włącz/Wyłącz sekcję dodawania i edycji danych podopiecznego."
          helpText="W tej sekcji mozesz dodać nowego podopiecznego lub edytować dane podopiecznego aktualnie
          wybranego. Wprowadź dane w odpowiednie pola formularza, a następnie kliknij przycisk
          DODAJ PODOPIECZNEGO w przypadku nowego dziecka lub AKTUALIZUJ DANE w przypadku zmian danych
          w trybie EDYCJA."
        />
      </GridContainer>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '85%' }}
        id={AvailableDestinations.userData}
      >
        <UserPersonalData
          user={user}
          isAdmin={false}
          name={AvailableDestinations.userData}
        />
      </GridContainer>
    </div>
  );
};

export default ChildHandling;
