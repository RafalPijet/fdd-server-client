import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CustomCarousel from '../../common/CustomCarousel/CustomCarousel';
import { calculateAge } from '../../../types/functions';
import { useStyles, Props } from './ChildPresentationStyle';
import { FddTooltip } from '../../../types/global';
import image from '../../../images/butterfly.png';
import heartImage from '../../../images/heard.png';

const ChildPresentation: React.FC<Props> = (props) => {
  const { selectedChild } = props;
  const classes = useStyles();
  const [isRedirectToDonate, setIsRedirectToDonate] = useState<boolean>(false);

  if (isRedirectToDonate) {
    return <Redirect to={`/donate/${selectedChild._id}`} />;
  }

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
              lg={7}
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
            <GridItem
              xs={9}
              sm={9}
              lg={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FddTooltip
                title={`Przekaż datek dla ${selectedChild.firstName} ${selectedChild.lastName}`}
                placement="top"
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 1000 }}
                enterDelay={500}
              >
                <ButtonBase
                  focusRipple
                  onClick={() =>
                    setTimeout(() => setIsRedirectToDonate(true), 300)
                  }
                  className={classes.donate}
                  focusVisibleClassName={classes.focusVisible}
                >
                  <span
                    className={classes.icon}
                    style={{
                      backgroundImage: `url(${heartImage})`,
                      width: 80,
                      height: 80,
                      paddingTop: 10,
                    }}
                  />
                </ButtonBase>
              </FddTooltip>
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
