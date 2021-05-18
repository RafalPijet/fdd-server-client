import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getPersonByIdRequest } from '../../../redux/thunks';
import { SearchUserType, CssTextField } from '../../../types/global';
import {
  setUserToast,
  setSelectedPerson,
  setSelectedUserType,
  getSelectedUserType,
  setSelectedChild,
} from '../../../redux/actions/generalActions';
import { getAdding } from '../../../redux/actions/requestActions';
import { API_URL } from '../../../config';
import {
  useStyles,
  StyleProps,
  PropsClasses,
  FddRadio,
  SelectedPerson,
} from './SearcherOfUsersStyle';

const SearcherOfUsers: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const dispatch = useDispatch();
  const isAdding = useSelector(getAdding);
  const selectedUserType = useSelector(getSelectedUserType);
  const [open, setOpen] = useState<boolean>(false);
  const [
    selectedPersonName,
    setSelectedPersonName,
  ] = useState<SelectedPerson | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const [userType, setUserType] = useState<SearchUserType>(
    SearchUserType.child
  );
  const loading = open && options.length === 0;

  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);

  useEffect(() => {
    if (userType !== selectedUserType) {
      dispatch(setSelectedUserType(userType));
    }
  }, [userType]);

  useEffect(() => {
    if (selectedPersonName !== null) {
      dispatch(getPersonByIdRequest(userType, selectedPersonName._id));
    } else {
      dispatch(setSelectedPerson(null));
      dispatch(setSelectedChild(null));
    }
  }, [selectedPersonName]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const res: AxiosResponse = await axios.get(
          `${API_URL}/admin/people/names/${userType}`,
          {
            headers: {
              Authorization: localStorage.getItem('tokenFDD'),
            },
          }
        );
        const names = res.data.names;

        if (active && names) {
          setOptions(names);
        }
      } catch (err) {
        dispatch(
          setUserToast({
            isOpen: true,
            content: err.response.data.message,
            variant: 'error',
          })
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPersonName(null);
    setUserType(event.target.value as SearchUserType);
  };

  const selectedItemHandling = (
    e: React.ChangeEvent<{}>,
    value: SelectedPerson | null
  ) => {
    setSelectedPersonName(value);
  };

  return (
    <Card className={cardClasses}>
      <CardBody>
        <FormControl style={{ width: '100%' }}>
          <GridContainer>
            <GridItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              xs={8}
              sm={8}
              md={8}
            >
              <Paper elevation={9} className={classes.searcher}>
                <Autocomplete
                  disabled={isAdding}
                  id="person-searcher"
                  open={open}
                  size="small"
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  value={selectedPersonName}
                  clearText="Usuń wybór"
                  noOptionsText="Nie znaleziono"
                  loadingText="Czekaj..."
                  onChange={selectedItemHandling}
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={(option) => option.name}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <CssTextField
                      {...params}
                      label="Wyszukaj..."
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? (
                              <CircularProgress
                                style={{ color: '#fff' }}
                                color="inherit"
                                size={20}
                              />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Paper>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <RadioGroup value={userType} onChange={handleChange}>
                <FormControlLabel
                  value={SearchUserType.child}
                  control={<FddRadio />}
                  label="Podopieczny"
                  labelPlacement="end"
                  style={{ color: '#fff' }}
                  disabled={isAdding}
                />
                <FormControlLabel
                  value={SearchUserType.parent}
                  control={<FddRadio />}
                  label="Rodzic"
                  labelPlacement="end"
                  style={{ color: '#fff' }}
                  disabled={isAdding}
                />
                <FormControlLabel
                  value={SearchUserType.admin}
                  control={<FddRadio />}
                  label="Admin"
                  labelPlacement="end"
                  style={{ color: '#fff' }}
                  disabled={isAdding}
                />
              </RadioGroup>
            </GridItem>
          </GridContainer>
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default SearcherOfUsers;
