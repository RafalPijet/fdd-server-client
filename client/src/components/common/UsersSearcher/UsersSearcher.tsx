import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import axios, { AxiosResponse } from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setUserToast } from '../../../redux/actions/generalActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CssTextField } from '../../../types/global';
import { clearAndLogout } from '../../../redux/thunks';
import { useStyles, UserName, Props, FddSwitch } from './UsersSearcherStyle';

const UsersSearcher: React.FC<Props> = (props) => {
  const { label, api, getSelectedItem, isDisabled } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [isParent, setIsParent] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<UserName | null>(null);
  const [options, setOptions] = useState<UserName[]>([]);
  const loading = open && options.length === 0;
  const classes = useStyles();
  const dispatch = useDispatch();

  const switchLabel = classNames({
    [classes.label]: true,
    [classes.disabled]: !isParent,
  });

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const res: AxiosResponse = await axios.get(`${api}${isParent}`, {
          headers: {
            Authorization: localStorage.getItem('tokenFDD'),
          },
        });
        const names = res.data.names;

        if (active && names) {
          setOptions(names);
        }
      } catch (err) {
        if (err.response) {
          dispatch(
            setUserToast({
              isOpen: true,
              content: err.response.data.message,
              variant: 'error',
            })
          );
          if (
            err.response.status === 401 &&
            err.response.statusText === 'Unauthorized'
          ) {
            clearAndLogout();
          }
        }
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

  const usersHandling = () => {
    setIsParent(!isParent);
    setSelectedUser(null);
    getSelectedItem(null);
    setOptions([]);
  };

  const selectedItemHandling = (
    e: React.ChangeEvent<{}>,
    value: UserName | null
  ) => {
    setSelectedUser(value);
    getSelectedItem(value);
  };

  return (
    <FormGroup row className={classes.root}>
      <Autocomplete
        disabled={isDisabled}
        id="user-searcher"
        className={classes.input}
        open={open}
        size="small"
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={selectedUser}
        clearText="Usuń wybór"
        noOptionsText="Nie znaleziono"
        loadingText="Czekaj..."
        onChange={selectedItemHandling}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <CssTextField
            {...params}
            label={label}
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
      <FormControlLabel
        disabled={isDisabled}
        control={
          <FddSwitch size="small" checked={isParent} onChange={usersHandling} />
        }
        classes={{
          label: switchLabel,
        }}
        label={'Rodzice'}
      />
    </FormGroup>
  );
};

export default UsersSearcher;
