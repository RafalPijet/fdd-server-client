import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Card from '../../common/Card/Card';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CardBody from '../../common/CardBody/CardBody';
import { SelectedPerson } from '../../features/SearcherOfUsers/SearcherOfUsersStyle';
import { getReportsRequest } from '../../../redux/thunks';
import {
  getUsersQuantity,
  getChildrenQuantity,
  getPublicatedNewsQuantity,
  getInvoicesQuantity,
  getCurrentYearReportIsPublicated,
  getUnpublicatedChildren,
  getUnpublicatedChildrenQuantity,
  getParentsWithoutAnyChildren,
  getParentsWithoutAnyChildrenQuantity,
} from '../../../redux/actions/reportsActions';
import {
  getReporting,
  getReportingSuccess,
  resetReportingRequest,
} from '../../../redux/actions/requestActions';
import { useStyles, Props } from './RaportZoneStyle';

const RaportsZone: React.FC<Props> = (props) => {
  const { socket } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getReporting);
  const isPendingSuccess = useSelector(getReportingSuccess);
  const parentsQuantity = useSelector(getUsersQuantity);
  const childrenQuantity = useSelector(getChildrenQuantity);
  const publicatedNewsQuantity = useSelector(getPublicatedNewsQuantity);
  const invoicesQuantity = useSelector(getInvoicesQuantity);
  const currentYearReportIsPublicated = useSelector(
    getCurrentYearReportIsPublicated
  );
  const unpublicatedChildren = useSelector(getUnpublicatedChildren);
  const unpublicatedChildrenQuantity = useSelector(
    getUnpublicatedChildrenQuantity
  );
  const parentsWithoutAnyChildren = useSelector(getParentsWithoutAnyChildren);
  const parentsWithoutAnyChildrenQuantity = useSelector(
    getParentsWithoutAnyChildrenQuantity
  );
  const currentYear = new Date().getFullYear().toString();
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);

  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });

  const bodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.pending]: isPending,
  });

  const childrenListClasses = classNames({
    [classes.list]: true,
    [classes.pending]: unpublicatedChildrenQuantity === 0,
  });

  const parentsListClasses = classNames({
    [classes.list]: true,
    [classes.pending]: parentsWithoutAnyChildrenQuantity === 0,
  });

  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);

  useEffect(() => {
    dispatch(getReportsRequest());
  }, []);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.on('change', (data) => {
        if (isPendingSuccess) {
          dispatch(resetReportingRequest());
          dispatch(getReportsRequest());
        }
      });
    }
  }, [socket]);

  return (
    <Card className={cardClasses}>
      <CardBody className={bodyClasses}>
        {isPending ? (
          <Typography>Aktualizacja danych...</Typography>
        ) : (
          <GridContainer
            justify="center"
            alignItems="center"
            style={{ height: '100%' }}
          >
            <GridItem xs={12} sm={10} lg={10}>
              <Typography>Ilość rodziców:</Typography>
            </GridItem>
            <GridItem xs={12} sm={2} lg={2}>
              <Typography align="right" className={classes.content}>
                {parentsQuantity}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={10} lg={10}>
              <Typography>Ilość podopiecznych:</Typography>
            </GridItem>
            <GridItem xs={12} sm={2} lg={2}>
              <Typography align="right" className={classes.content}>
                {childrenQuantity}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={10} lg={10}>
              <Typography>Ilość publikowanych aktualności:</Typography>
            </GridItem>
            <GridItem xs={12} sm={2} lg={2}>
              <Typography align="right" className={classes.content}>
                {publicatedNewsQuantity}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={10} lg={10}>
              <Typography>Ilość przesłanych faktur:</Typography>
            </GridItem>
            <GridItem xs={12} sm={2} lg={2}>
              <Typography align="right" className={classes.content}>
                {invoicesQuantity}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={10} lg={10}>
              <Typography>
                Sprawozdania za rok {parseInt(currentYear) - 1} są opublikowane:
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={2} lg={2}>
              <Typography align="right" className={classes.content}>
                {currentYearReportIsPublicated ? 'TAK' : 'NIE'}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={10} lg={10}>
              <Typography>Ilość niepublikowanych podopiecznych:</Typography>
            </GridItem>
            <GridItem xs={12} sm={2} lg={2}>
              <Typography align="right" className={classes.content}>
                {unpublicatedChildrenQuantity}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={10} lg={10}>
              <Typography>
                Ilość rodziców bez przydzielonych podopiecznych:
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={2} lg={2}>
              <Typography align="right" className={classes.content}>
                {parentsWithoutAnyChildrenQuantity}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={7} lg={7}>
              <Typography>Lista niepublikowanych podopiecznych:</Typography>
            </GridItem>
            <GridItem xs={12} sm={5} lg={5}>
              <Paper variant="outlined" className={childrenListClasses}>
                {unpublicatedChildren.length > 0 ? (
                  unpublicatedChildren.map(
                    (child: SelectedPerson, index: number) => {
                      return (
                        <Typography key={child._id} className={classes.content}>
                          {index + 1}. {child.name}
                        </Typography>
                      );
                    }
                  )
                ) : (
                  <Typography className={classes.content}>Brak</Typography>
                )}
              </Paper>
            </GridItem>
            <GridItem xs={12} sm={7} lg={7}>
              <Typography>
                Lista rodziców bez przydzielonych podopiecznych:
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={5} lg={5}>
              <Paper variant="outlined" className={parentsListClasses}>
                {parentsWithoutAnyChildren.length > 0 ? (
                  parentsWithoutAnyChildren.map(
                    (parent: SelectedPerson, index: number) => {
                      return (
                        <Typography
                          key={parent._id}
                          className={classes.content}
                        >
                          {index + 1}. {parent.name}
                        </Typography>
                      );
                    }
                  )
                ) : (
                  <Typography className={classes.content}>Brak</Typography>
                )}
              </Paper>
            </GridItem>
          </GridContainer>
        )}
      </CardBody>
    </Card>
  );
};

export default RaportsZone;
