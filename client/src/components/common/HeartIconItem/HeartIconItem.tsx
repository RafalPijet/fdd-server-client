import React, { useEffect, useState } from 'react';
import ClassNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { useStyles, Props } from './HeartIconItemStyle';
import { payValues } from '../../pages/DonatePage/DonatePageStyle';
import heardIcon from '../../../images/emptyHeard.png';
import butterfly from '../../../images/butterflyMini.png';

const HeartIconItem: React.FC<Props> = (props) => {
  const { value, selectedValue, getSelectedValue, isOther } = props;
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const titleClasses = ClassNames({
    [classes.imageTitle]: payValues.includes(value),
    [classes.anotherTitle]: isOther,
  });

  const imageButtonClasses = ClassNames({
    [classes.imageButton]: true,
    [classes.selectedImageButton]: isSelected,
  });

  const imageBackdropClasses = ClassNames({
    [classes.imageBackdrop]: true,
    [classes.selectedImageBackdrop]: isSelected,
  });

  useEffect(() => {
    if (isOther === undefined) {
      setIsSelected(value === selectedValue);
    } else {
      if (isOther) {
        setIsSelected(!payValues.includes(selectedValue));
      }
    }
  }, [selectedValue]);

  const selectedValueHandling = () => {
    if (isOther) {
      getSelectedValue(selectedValue + 1);
    } else {
      getSelectedValue(value);
    }
  };

  return (
    <Paper elevation={isSelected ? 3 : 20} className={classes.root}>
      {isSelected && (
        <span>
          <img
            className={classes.butterfly}
            src={butterfly}
            alt="butter-fly-icon"
          />
        </span>
      )}
      <ButtonBase
        focusRipple
        onClick={selectedValueHandling}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${heardIcon})`,
          }}
        />
        <span className={imageBackdropClasses} />
        <div className={imageButtonClasses}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={titleClasses}
          >
            {!isOther ? `${value} zł` : 'inna kwota'}
          </Typography>
        </div>
      </ButtonBase>
    </Paper>
  );
};

export default HeartIconItem;
