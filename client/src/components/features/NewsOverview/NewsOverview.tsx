import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import NewsOverviewItem from '../NewsOverviewItem/NewsOverviewItem';
import { NewsState } from '../../../types/global';
import { useStyles, Props } from './NewsOverviewStyle';

const NewsOverview: React.FC<Props> = (props) => {
  const { news } = props;
  const classes = useStyles();

  const [currentNews, setCurrentNews] = useState<NewsState | null>(null);
  const [chosenId, setChosenId] = useState<string>('');

  useEffect(() => {
    setCurrentNews(news[0]);
    setChosenId(news[0]._id);
  }, []);

  const currentNewsHandling = (data: NewsState) => {
    setCurrentNews(data);
    setChosenId(data._id);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      {news.map((item: NewsState) => {
        return (
          <NewsOverviewItem
            key={item._id}
            currentNews={item}
            chosenId={chosenId}
            getChosenNews={currentNewsHandling}
          />
        );
      })}
    </Paper>
  );
};

export default NewsOverview;
