import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CustomCarousel from '../../common/CustomCarousel/CustomCarousel';
import { calculateAge } from '../../../types/functions';
import { useStyles, Props } from './ChildPresentationStyle';
import image from '../../../images/butterfly.png';

const ChildPresentation: React.FC<Props> = (props) => {
  const { selectedChild } = props;
  const classes = useStyles();

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} lg={5} style={{ paddingRight: 0 }}>
        <Paper elevation={24} className={classes.childData}>
          <GridContainer
            justify="center"
            style={{ width: '100%', margin: '0 auto' }}
          >
            <GridItem xs={3} sm={3} lg={3}>
              <Avatar
                variant="rounded"
                src={selectedChild.avatar}
                alt={`${selectedChild.firstName} ${selectedChild.lastName}`}
                className={classes.avatar}
              />
            </GridItem>
            <GridItem
              xs={9}
              sm={9}
              lg={9}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
              }}
            >
              <Typography variant="h5" className={classes.primaryColor}>
                {selectedChild.firstName} {selectedChild.lastName}
              </Typography>

              <Typography className={classes.primaryColor}>
                {calculateAge(selectedChild.birthDate, true)}
              </Typography>
            </GridItem>
          </GridContainer>
        </Paper>
        <Paper className={classes.info} elevation={24}>
          <Typography align="justify">{selectedChild.info}</Typography>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={12} lg={7}>
        <Paper elevation={24} className={classes.root}>
          <GridContainer justify="center" alignItems="center">
            <GridItem xs={12} sm={12} lg={12} style={{ maxWidth: '860px' }}>
              {selectedChild.images.length ? (
                <CustomCarousel
                  images={selectedChild.images}
                  isAutoPlay={false}
                />
              ) : (
                <div className={classes.empty}>
                  <img src={image} alt="without-logo" />
                </div>
              )}
            </GridItem>
          </GridContainer>
        </Paper>
      </GridItem>
    </GridContainer>
  );
};

export default ChildPresentation;
