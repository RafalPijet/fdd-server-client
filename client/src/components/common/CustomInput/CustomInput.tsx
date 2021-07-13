import React from 'react';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputProps } from '@material-ui/core';
import { PhoneIphone, Edit, Done } from '@material-ui/icons';
import { useStyles, Props } from './CustomInputStyle';

import InputMask from 'react-input-mask';

const CustomInput: React.FC<Props> = (props) => {
  const classes = useStyles();
  const {
    value,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    onChange,
    onKeyDown,
    mask,
    formatMask,
    iconType,
    isDisabled,
    autoFocus,
  } = props;

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }

  const setIcon = (icon: 'edit' | 'phone' | 'done') => {
    switch (icon) {
      case 'edit': {
        return <Edit />;
      }
      case 'phone': {
        return <PhoneIphone />;
      }
      case 'done': {
        return <Done />;
      }
      default:
        return '';
    }
  };

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + ' ' + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      {mask ? (
        <InputMask
          mask={formatMask!}
          onChange={onChange}
          value={value}
          disabled={isDisabled}
        >
          {(inputProps: InputProps) => (
            <Input
              disabled={isDisabled}
              classes={{
                input: inputClasses,
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses,
              }}
              endAdornment={
                <InputAdornment position="end">
                  {setIcon(iconType!)}
                </InputAdornment>
              }
              error={error}
              id={id}
              {...inputProps}
            />
          )}
        </InputMask>
      ) : (
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          classes={{
            input: inputClasses,
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses,
          }}
          disabled={isDisabled}
          error={error}
          id={id}
          {...inputProps}
        />
      )}
    </FormControl>
  );
};

export default CustomInput;
