import React from 'react';
import classNames from 'classnames';
import { List, ListItem } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import { PropsClasses, useStyles, StyleProps, Props } from './FooterStyle';

const Footer: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  let date: number = new Date().getFullYear();
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://doroslidzieciom.org/"
                className={classes.block}
                target="_blank"
              >
                O nas
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://doroslidzieciom.org/"
                className={classes.block}
                target="_blank"
              >
                Kontakt
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://doroslidzieciom.org/"
                className={classes.block}
                target="_blank"
              >
                Status
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
    </footer>
  );
};

export default Footer;
