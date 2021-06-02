import React from 'react';
import Paper from '@material-ui/core/Paper';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import RemovingImage from '../../common/RemovingImage/RemovingImage';
import AddingImage from '../../common/AddingImage/AddingImage';
import { AvailableDestinations } from '../../../types/global';
import { State } from '../../common/RemovingImage/RemovingImageStyle';
import { Props, useStyles } from './NewsCreateEditStyle';

const NewsCreateEdit: React.FC<Props> = (props) => {
  const { currentNews } = props;
  const classes = useStyles();

  const currentNewsImagesHandling = (data: State) => {
    console.log(data);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          Create / Edit Title and Content of Current News
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <RemovingImage
            imagesUrl={currentNews !== null ? currentNews.images : []}
            childId={null}
            name={AvailableDestinations.removingImage}
            isNewsHandling={true}
            getImagesState={currentNewsImagesHandling}
          />
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default NewsCreateEdit;
