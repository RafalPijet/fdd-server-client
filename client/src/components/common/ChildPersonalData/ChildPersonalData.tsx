import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Edit, Done } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import SectionHeader from '../SectionHeader/SectionHeader';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import { IChildData, FddSwitch } from '../../../types/global';
import { addChildToParent } from '../../../redux/thunks';
import { StyleProps, PropsClasses, useStyles } from './ChildPersonalDataStyle';

const ChildPersonalData: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const dispatch = useDispatch();
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [childData, setChildData] = useState<IChildData>({
    firstName: '',
    lastName: '',
    birthDate: '2000-01-01',
    info: '',
  });
  const [isError, setIsError] = useState<Record<keyof IChildData, boolean>>({
    firstName: false,
    lastName: false,
    birthDate: false,
    info: false,
  });
  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChildData({ ...childData, [event.target.id!]: event.target.value });
  };

  const confirmButtonHandling = () => {
    dispatch(addChildToParent(childData));
  };

  const switchIsEditHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdit(e.target.checked);
  };

  return (
    <Card className={rootClasses}>
      <SectionHeader
        isExistChild={false}
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText="Help text"
        text="Włącz/Wyłącz sekcję dodawania i edycji danych podopiecznego."
      />
      <CardBody>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%', margin: '0 auto' }}
        >
          <GridItem xs={12} sm={12} lg={4}>
            <CustomInput
              isDisabled={!switchIsOn}
              labelText="Imię dziecka..."
              id="firstName"
              labelProps={
                switchIsOn
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn }
              }
              value={childData.firstName}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.firstName && childData.firstName.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <CustomInput
              isDisabled={!switchIsOn}
              labelText="Nazwisko dziecka"
              id="lastName"
              labelProps={
                switchIsOn
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn }
              }
              value={childData.lastName}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.lastName && childData.lastName.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <CustomInput
              isDisabled={!switchIsOn}
              labelText="Data urodzenia..."
              id="birthDate"
              labelProps={
                switchIsOn
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn }
              }
              value={childData.birthDate.toString()}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'date',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.birthDate &&
                    childData.birthDate.toString().length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} lg={8}>
            <CustomInput
              isDisabled={!switchIsOn}
              labelText="Opis..."
              id="info"
              labelProps={
                switchIsOn
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn }
              }
              value={childData.info}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                multiline: true,
                rows: 15,
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.info && childData.info.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.footer}>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%', margin: '0 auto' }}
        >
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CustomButton
              disabled={!switchIsOn}
              setSize="md"
              setColor="primary"
              onClick={confirmButtonHandling}
            >
              {isEdit ? 'Aktualizuj dane' : 'Dodaj podopiecznego'}
            </CustomButton>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FormControlLabel
              disabled={!switchIsOn}
              classes={{
                label: classes.switch,
              }}
              control={
                <FddSwitch checked={isEdit} onChange={switchIsEditHandling} />
              }
              label="EDYCJA"
            />
          </GridItem>
        </GridContainer>
      </CardFooter>
    </Card>
  );
};

export default ChildPersonalData;
