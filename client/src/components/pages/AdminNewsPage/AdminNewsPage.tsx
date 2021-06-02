import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import NewsOverview from '../../features/NewsOverview/NewsOverview';
import NewsCreateEdit from '../../features/NewsCreateEdit/NewsCreateEdit';
import { useStyles } from './AdminNewsPageStyle';

import { NewsState } from '../../../types/global';
import image1 from '../../../images/jumbotronAdmin.jpg';
import image2 from '../../../images/jumbotronMain.jpg';
import image3 from '../../../images/jumbotronParent.jpg';
import image4 from '../../../images/newsBackground.jpg';

const news: NewsState[] = [
  {
    _id: '1',
    images: [image4, image1],
    title: 'Zbiórka dla Stasia',
    createdAt: new Date(),
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
  },
  {
    _id: '2',
    images: [image2],
    title: 'Spotkanie z prezydentem miasta',
    createdAt: new Date(),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    _id: '3',
    images: [image3],
    title: 'Impreza dobroczynna z udziałem mistrza Polski w skoku o tyczce',
    createdAt: new Date(),
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
];

const AdminNewsPage: React.FC = () => {
  const classes = useStyles();
  const [currentNews, setCurrentNews] = useState<NewsState | null>(null);

  useEffect(() => {
    setCurrentNews(news[0]);
  }, []);

  return (
    <div>
      <Header
        isSpiner={false}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={false} />}
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.titlePage}>
            Aktualności
          </Typography>
        </div>
      </div>
      <div className={ClassNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <NewsOverview news={news} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <NewsCreateEdit currentNews={currentNews} />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default AdminNewsPage;
