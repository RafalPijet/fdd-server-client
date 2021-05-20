import React from 'react';
import Paper from '@material-ui/core/Paper';
import Classnames from 'classnames';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import ChildrenZone from '../../features/ChildrenZone/ChildrenZone';
import Typography from '@material-ui/core/Typography';
import {
  StyleProps,
  Props,
  PropsClasses,
  useStyles,
} from './ShowUserDataStyle';

const ShowUserData: React.FC<Props> = (props) => {
  const { user } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const titleClasses = Classnames({
    [classes.title]: true,
    [classes.alignBaseline]: true,
  });
  const iconClasses = Classnames({
    [classes.title]: true,
    [classes.alignCenter]: true,
  });
  const emailClasses = Classnames({
    [classes.text]: true,
    [classes.email]: true,
  });

  return (
    <Paper className={classes.root} elevation={6}>
      <Paper elevation={8} className={classes.header}>
        <GridContainer justify="center" style={{ padding: '10px 0' }}>
          <GridItem
            xs={12}
            sm={12}
            lg={4}
            style={{ display: 'flex', justifyContent: 'inherit' }}
          >
            <span className={titleClasses}>
              imię i nazwisko:
              <Typography variant="h6" className={classes.text}>
                {user.firstName} {user.lastName}
              </Typography>
            </span>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={4}
            style={{ display: 'flex', justifyContent: 'inherit' }}
          >
            <span className={iconClasses}>
              <PhoneIphoneIcon />
              <Typography variant="h6" className={classes.text}>
                +{user.phone.substring(0, 2)} {user.phone.substring(2, 5)}-
                {user.phone.substring(5, 8)}-
                {user.phone.substring(8, user.phone.length)}
              </Typography>
            </span>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={4}
            style={{ display: 'flex', justifyContent: 'inherit' }}
          >
            <span className={iconClasses}>
              <EmailIcon />
              <a href={`mailto:${user.email}`} className={emailClasses}>
                {user.email}
              </a>
            </span>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ padding: '10px 0' }} justify="center">
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'inherit' }}
          >
            <span className={titleClasses}>
              adres:
              <Typography variant="h6" className={classes.text}>
                {user.adress.zipCode.substring(0, 2)}-
                {user.adress.zipCode.substring(2, user.adress.zipCode.length)}{' '}
                {user.adress.town}
                {', '}
                {user.adress.street} {user.adress.number}
              </Typography>
            </span>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'inherit' }}
          >
            <span className={titleClasses}>
              ilość podopiecznych:
              <Typography variant="h6" className={classes.text}>
                {user.children.length}
              </Typography>
            </span>
          </GridItem>
        </GridContainer>
      </Paper>
      <GridContainer justify="center">
        {user.children.map((child, index) => (
          <GridItem key={index} xs={12} sm={12} lg={7}>
            <div className={classes.childZone}>
              <ChildrenZone childData={child} />;
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </Paper>
  );
};

export default ShowUserData;
