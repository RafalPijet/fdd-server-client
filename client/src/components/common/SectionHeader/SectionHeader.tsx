import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import Zoom from '@material-ui/core/Zoom';
import ClassNames from 'classnames';
import {
  FddSwitch,
  PropsClasses,
  Props,
  useStyles,
  StyleProps,
  FddTooltip,
} from './SectionHeaderStyle';

const SectionHeader: React.FC<Props> = (props) => {
  const { onChange, checked, helpText, text } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const iconClasses = ClassNames({
    [classes.icon]: true,
    [classes.disabled]: !checked,
  });
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
