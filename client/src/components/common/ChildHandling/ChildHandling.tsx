import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Edit, Done } from '@material-ui/icons';
import AddingImage from '../AddingImage/AddingImage';
import { addChildToParent } from '../../../redux/thunks';
import { getSelectedChild } from '../../../redux/actions/generalActions';
import {
  IChildData,
  StyleProps,
  PropsClasses,
  useStyles,
} from './ChildHandlingStyle';

const ChildHandling: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
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
  const dispatch = useDispatch();
  const childId = useSelector(getSelectedChild);

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChildData({ ...childData, [event.target.id!]: event.target.value });
  };

  const confirmButtonHandling = () => {
    dispatch(addChildToParent(childData));
  };

  return (
    <div style={{ marginLeft: '15px', marginRight: '15px' }}>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} lg={3}>
          <CustomInput
            labelText="Imię dziecka..."
            id="firstName"
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
            labelText="Nazwisko dziecka..."
            id="lastName"
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
            labelText="Data urodzenia..."
            id="birthDate"
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
        <GridItem xs={12} sm={12} lg={6}>
          <CustomInput
            labelText="Opis..."
            id="info"
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
        <GridItem
          xs={12}
          sm={12}
          lg={3}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <CustomButton
            setSize="md"
            setColor="primary"
            onClick={confirmButtonHandling}
          >
            Dodaj
          </CustomButton>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center" alignItems="center">
        <GridItem
          xs={12}
          sm={12}
          lg={6}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <AddingImage childId={childId} />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          lg={6}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          Remove Images Section
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ChildHandling;
