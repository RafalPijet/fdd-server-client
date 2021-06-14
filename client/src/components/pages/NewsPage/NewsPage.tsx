import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import { getNews } from '../../../redux/actions/generalActions';
import { NewsState } from '../../../types/global';
import { useStyles } from './NewsPageStyle';
import image from '../../../images/newsBackground.jpg';

const NewsPage: React.FC = () => {
  const classes = useStyles();
  const news = useSelector(getNews);
  const location = useLocation();
  const [currentNews, setCurrentNews] = useState<NewsState | null>(null);

  useEffect(() => {
    const newsId = location.pathname.replace('/news/', '');
    // console.log(newsId);
    // console.log(news);
    if (news !== null) {
      const chosenNews = news.find((item: NewsState) => item._id === newsId);
      if (chosenNews !== undefined) {
        setCurrentNews(chosenNews);
      }
    }
  }, []);
  console.log(currentNews);
  return (
    <div>
      <Header
        isSpiner={false}
        absolute
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={false} />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <Paper elevation={3} className={classes.root}>
            <Typography variant="h4">Aktualności</Typography>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
