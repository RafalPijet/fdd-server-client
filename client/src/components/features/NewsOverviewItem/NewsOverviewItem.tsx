import React, { useEffect, useState } from 'react';
import ClassNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Props, useStyles } from './NewsOverviewItemStyle';
import thumbnail from '../../../images/thumbnail.jpg';

const NewsOverviewItem: React.FC<Props> = (props) => {
  const { currentNews, chosenId, getChosenNews } = props;
  const classes = useStyles();
  const [isChosen, setIsChosen] = useState<boolean>(false);

  const imagesClasses = ClassNames({
    [classes.image]: true,
    [classes.active]: isChosen,
  });

  useEffect(() => {
    setIsChosen(chosenId === currentNews._id);
  }, [chosenId]);

  const selectButtonHandling = () => {
    getChosenNews(currentNews);
  };

  return (
    <ButtonBase
      focusRipple
      className={imagesClasses}
      focusVisibleClassName={classes.focusVisible}
      onClick={selectButtonHandling}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${
            currentNews.images.length ? currentNews.images[0] : thumbnail
          })`,
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
          {currentNews.title}
          <span className={classes.imageMarked}></span>
        </Typography>
      </span>
    </ButtonBase>
  );
};

export default NewsOverviewItem;
