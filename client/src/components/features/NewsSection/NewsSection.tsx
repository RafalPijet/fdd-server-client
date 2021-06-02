import React from 'react';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import NewsItem from '../../features/NewsItem/NewsItem';
import { NewsState } from '../../../types/global';
import { useStyles, Props } from './NewsSectionStyle';
import image1 from '../../../images/jumbotronAdmin.jpg';
import image2 from '../../../images/jumbotronMain.jpg';
import image3 from '../../../images/jumbotronParent.jpg';

const news: NewsState[] = [
  {
    _id: '1',
    images: [image1],
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

const NewsSection: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Aktualności
          </Typography>
          {news.map((item: NewsState, index) => {
            return <NewsItem key={item._id} news={item} index={index} />;
          })}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default NewsSection;
