import React, { useState } from 'react';
import ClassNames from 'classnames';
import { Redirect } from 'react-router';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { cutText, isEven } from '../../../types/functions';
import { useStyles, Props } from './NewsItemStyle';

const NewsItem: React.FC<Props> = (props) => {
  const { news, index } = props;
  const classes = useStyles();
  const [isRedirect, setIsRedirect] = useState(false);

  const contentClasses = ClassNames({
    [classes.content]: true,
    [classes.contentRight]: isEven(index),
    [classes.contentLeft]: !isEven(index),
  });

  if (isRedirect) {
    return <Redirect to={`/news/:${index}`} />;
  }

  return (
    <Paper elevation={6} className={classes.root}>
      <GridContainer justify="center">
        {!isEven(index) && (
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography className={contentClasses} align="justify">
              {cutText(news.content, 300)}
            </Typography>
          </GridItem>
        )}
        <GridItem xs={12} sm={12} md={6}>
          <ButtonBase
            focusRipple
            onClick={() => setTimeout(() => setIsRedirect(true), 300)}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: '100%',
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${news.images[0]})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {news.title}
                <span className={classes.imageMarked}>
                  <PhotoLibraryIcon fontSize="large" />
                </span>
              </Typography>
            </span>
          </ButtonBase>
        </GridItem>

        {isEven(index) && (
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography className={contentClasses} align="justify">
              {cutText(news.content, 300)}
            </Typography>
          </GridItem>
        )}
      </GridContainer>
    </Paper>
  );
};

export default NewsItem;
