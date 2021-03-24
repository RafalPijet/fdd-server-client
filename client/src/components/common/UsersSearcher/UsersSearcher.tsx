import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios, { AxiosResponse } from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  StyleProps,
  PropsClasses,
  useStyles,
  UserName,
  Props,
  FddSwitch,
} from './UsersSearcherStyle';

const UsersSearcher: React.FC<Props> = (props) => {
  const { label, api } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [isParent, setIsParent] = useState<boolean>(true);
  const [options, setOptions] = useState<UserName[]>([]);
  const loading = open && options.length === 0;
  const classes: PropsClasses = useStyles({} as StyleProps);

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res: AxiosResponse = await axios.get(`${api}${isParent}`, {
        headers: {
          Authorization: localStorage.getItem('tokenFDD'),
        },
      });
      const names = res.data.names;
      console.log(names);

      if (active) {
        setOptions(names);
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
  };

  return (
    <FormGroup row className={classes.root}>
      <Autocomplete
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
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            classes={{}}
            InputLabelProps={{
              className: classes.label,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <FormControlLabel
        control={
          <FddSwitch size="small" checked={isParent} onChange={usersHandling} />
        }
        className={switchLabel}
        label={'Rodzice'}
      />
    </FormGroup>
  );
};

export default UsersSearcher;
