import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HelpIcon from '@material-ui/icons/Help';
import Zoom from '@material-ui/core/Zoom';
import ClassNames from 'classnames';
import {
  getSelectedChild,
  setUserToast,
} from '../../../redux/actions/generalActions';
import { FddSwitch } from '../../../types/global';
import {
  PropsClasses,
  Props,
  useStyles,
  StyleProps,
  FddTooltip,
} from './SectionHeaderStyle';

const SectionHeader: React.FC<Props> = (props) => {
  const { onChange, checked, helpText, text, isExistChild } = props;
  const dispatch = useDispatch();
  const selectedChild = useSelector(getSelectedChild);
  const classes: PropsClasses = useStyles({} as StyleProps);
  const iconClasses = ClassNames({
    [classes.icon]: true,
    [classes.disabled]: !checked,
  });

  useEffect(() => {
    if (checked && isExistChild) {
      if (selectedChild === null)
        dispatch(
          setUserToast({
            isOpen: true,
            content:
              'Ta sekcja nie moze być obsługiwana bez przydzielonego podopiecznego',
            variant: 'info',
          })
        );
    }
  }, [checked, isExistChild, selectedChild]);

  return (
    <div className={classes.root}>
      <FddTooltip
        title={text}
        arrow
        placement="right"
        TransitionComponent={Zoom}
        enterDelay={1000}
        enterNextDelay={1000}
      >
        <FddSwitch checked={checked} onChange={onChange} />
      </FddTooltip>
      <FddTooltip
        disableHoverListener={!checked}
        title={helpText}
        arrow
        placement="left"
        TransitionComponent={Zoom}
      >
        <HelpIcon className={iconClasses} fontSize="large" />
      </FddTooltip>
    </div>
  );
};

export default SectionHeader;
