import React, { useState, useEffect } from 'react';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import NewsItem from '../../features/NewsItem/NewsItem';
import { NewsState } from '../../../types/global';
import { useStyles, Props } from './NewsSectionStyle';

const NewsSection: React.FC<Props> = (props) => {
  const { news } = props;
  const classes = useStyles();
  const [publicatedNews, setPublicatedNews] =
    useState<NewsState[] | null>(news);

  useEffect(() => {
    if (news !== null) {
      const chosenNews = news.filter(
        (item: NewsState) => item.publication !== false
      );
      setPublicatedNews(chosenNews);
    } else {
      setPublicatedNews(news);
    }
  }, [news]);

  return (
    <div className={classes.root}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Aktualności
          </Typography>
          {publicatedNews !== null ? (
            publicatedNews.map((item: NewsState, index) => {
              return <NewsItem key={item._id} news={item} index={index} />;
            })
          ) : (
            <Typography align="center">Wczytywanie...</Typography>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default NewsSection;
