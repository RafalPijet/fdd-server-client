import React, { useState } from 'react';
import classNames from 'classnames';
import { List, ListItem } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import ModalFddInfo from '../ModalFddInfo/ModalFddInfo';
import { InfoType } from '../ModalFddInfo/ModalFddInfoStyle';
import { useStyles, Props } from './FooterStyle';
import { MAIN_URL, URL } from '../../../config';

const Footer: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { whiteFont } = props;
  const [isModalInfo, setIsModalInfo] = useState<boolean>(false);
  const [infoType, setInfoType] = useState<InfoType>(InfoType.aboutUs);

  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  let date: number = new Date().getFullYear();

  const handleModalInfo = (type: InfoType) => {
    setInfoType(type);
    setIsModalInfo(!isModalInfo);
  };

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <button
                onClick={() => handleModalInfo(InfoType.aboutUs)}
                className={classes.button}
              >
                O nas
              </button>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <button
                onClick={() => handleModalInfo(InfoType.contact)}
                className={classes.button}
              >
                Kontakt
              </button>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href={`${MAIN_URL}statut`} className={classes.block}>
                Statut
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href={`${MAIN_URL}clause`} className={classes.block}>
                Klauzula informacyjna
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.gov.pl/web/rodzina/przekaz-1-podatku-dla-opp"
                className={classes.block}
                target="_blank"
              >
                gov.pl
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {date}, made with <Favorite className={classes.icon} /> by{' '}
          <a
            href="https://rafalpijet.github.io/"
            className={aClasses}
            target="_blank"
          >
            Rafał Pijet
          </a>
        </div>
      </div>
      <ModalFddInfo
        infoType={infoType}
        isOpen={isModalInfo}
        closeModal={() => handleModalInfo(infoType)}
      />
    </footer>
  );
};

export default Footer;
