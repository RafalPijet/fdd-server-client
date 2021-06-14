import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NewsOverviewItem from '../NewsOverviewItem/NewsOverviewItem';
import { getUpdating } from '../../../redux/actions/requestActions';
import { NewsState } from '../../../types/global';
import { useStyles, Props } from './NewsOverviewStyle';

const NewsOverview: React.FC<Props> = (props) => {
  const { news, getCurrentNews, chosenNews } = props;
  const classes = useStyles();
  const isPending = useSelector(getUpdating);
  const [currentNews, setCurrentNews] = useState<NewsState | null>(null);
  const [chosenId, setChosenId] = useState<string>('');

  useEffect(() => {
    if (news !== null) {
      setCurrentNews(chosenNews === null ? news[0] : chosenNews);
      if (chosenNews === null && news.length && news[0]._id) {
        setChosenId(news[0]._id);
      }
      if (chosenNews !== null && chosenNews._id) setChosenId(chosenNews._id);
    }
  }, [news, chosenNews]);

  useEffect(() => {
    getCurrentNews(currentNews);
  }, [currentNews]);

  const currentNewsHandling = (data: NewsState) => {
    setCurrentNews(data);
    if (data._id) setChosenId(data._id);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      {news !== null ? (
        news.map((item: NewsState) => {
          return (
            <NewsOverviewItem
              key={item._id}
              currentNews={item}
              chosenId={chosenId}
              getChosenNews={currentNewsHandling}
            />
          );
        })
      ) : (
        <Typography variant="h5">
          {isPending ? 'Wczytywanie...' : 'Brak artykułów z wiadomościami'}
        </Typography>
      )}
    </Paper>
  );
};

export default NewsOverview;
