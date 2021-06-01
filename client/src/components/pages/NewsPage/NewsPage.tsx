import React from 'react';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import { useStyles } from './NewsPageStyle';
import image from '../../../images/newsBackground.jpg';

const NewsPage: React.FC = () => {
  const classes = useStyles();
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
        NewsPage
      </div>
    </div>
  );
};

export default NewsPage;
