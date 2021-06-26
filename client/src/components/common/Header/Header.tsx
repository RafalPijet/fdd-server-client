import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import RequestProgress from '../RequestProgress/RequestProgress';
import ModalFddInfo from '../ModalFddInfo/ModalFddInfo';
import { InfoType } from '../ModalFddInfo/ModalFddInfoStyle';
import { Props, PropsClasses, useStyles, StyleProps } from './HeaderStyle';
import logo from '../../../images/butterflyMini.png';

const Header: React.FC<Props> = (props) => {
  const {
    color,
    rightLinks,
    leftLinks,
    brand,
    fixed,
    absolute,
    changeColorOnScroll,
    isSpiner,
  } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isModalInfo, setIsModalInfo] = useState<boolean>(false);

  useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange);
      }
    };
  });

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleModalInfo = (type: InfoType) => {
    setIsModalInfo(!isModalInfo);
  };

  const headerColorChange = (): void => {
    if (changeColorOnScroll) {
      const windowsScrollTop = window.pageYOffset;
      if (windowsScrollTop > changeColorOnScroll.height) {
        document.body
          .getElementsByTagName('header')[0]
          .classList.remove(classes[color]);
        document.body
          .getElementsByTagName('header')[0]
          .classList.add(classes[changeColorOnScroll.color]);
      } else {
        document.body
          .getElementsByTagName('header')[0]
          .classList.add(classes[color]);
        document.body
          .getElementsByTagName('header')[0]
          .classList.remove(classes[changeColorOnScroll.color]);
      }
    }
  };

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  const brandComponent = (
    <Button
      disabled={isSpiner}
      className={classes.title}
      onClick={() => handleModalInfo(InfoType.aboutUs)}
    >
      <img style={{ paddingRight: '5px' }} src={logo} alt="logo" />
      {brand}
    </Button>
  );

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
      <div style={{ height: '4px', width: '100%' }}>
        <RequestProgress
          className={classes.progressContainer}
          hidden={!isSpiner}
        />
      </div>
      <ModalFddInfo
        infoType={InfoType.aboutUs}
        isOpen={isModalInfo}
        closeModal={() => handleModalInfo(InfoType.aboutUs)}
      />
    </AppBar>
  );
};

export default Header;
