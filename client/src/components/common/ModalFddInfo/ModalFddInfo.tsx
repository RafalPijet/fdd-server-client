import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import Link from '@material-ui/core/Link';
import CustomButton from '../CustomButton/CustomButton';
import { TransitionProps } from '@material-ui/core/transitions';
import { useStyles, Props, InfoType } from './ModalFddInfoStyle';
import logo from '../../../images/butterflyMini.png';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalFddInfo: React.FC<Props> = (props) => {
  const { isOpen, closeModal, infoType } = props;
  const classes = useStyles();

  const showContent = () => {
    if (infoType === InfoType.aboutUs) {
      return (
        <>
          <Typography align="justify">
            DOROŚLI DZIECIOM to fundacja, która została stworzona dla potrzeb
            pomocy dzieciom. Jej działanie jest wszechstronne. Obejmuje przede
            wszystkim niesienie pomocy dzieciom chorym i niepełnosprawnym,
            których ze względów finansowych nie stać na leczenie i kompleksową
            rehabilitację, bez której powrót do zdrowia i utrzymanie sprawności
            jest niemożliwe.
          </Typography>
          <Typography align="justify">
            Nasza fundacja zajmuje się także ofiarami patologii społecznej i
            dziećmi, których rodzina nie jest w stanie zapewnić godnego i
            szczęśliwego dzieciństwa.
          </Typography>
          <Typography align="justify">
            Fundacja DOROŚLI DZIECIOM przekazuje środki na szerzenie kultury
            fizycznej, oraz organizowanie wycieczek sportowych i krajoznawczych.
            Pomocą obejmuje także instytucje oświatowe, poprzez kształcenie i
            przekazywanie środków dla potrzeb edukacyjnych dzieci i młodzieży.
            Celem fundacji jest również wspieranie finansowe placówek
            wychowawczo – opiekuńczych i zapewnienie dzieciom tam przebywającym
            odpowiednich warunków do życia i prawidłowego rozwoju. Pomocą są
            również objęte ofiary katastrof, klęsk żywiołowych oraz konfliktów
            zbrojnych.
          </Typography>
        </>
      );
    }
    if (infoType === InfoType.contact) {
      return (
        <>
          <Typography variant="h6" align="center">
            Fundacja DOROŚLI DZIECIOM
          </Typography>
          <Typography variant="h6" align="center" style={{ paddingBottom: 50 }}>
            ul. Kilińskiego 26 27-200 Starachowice
          </Typography>
          <span className={classes.title}>
            <PhoneIphoneIcon />
            <Typography>+48 692 089 011</Typography>
          </span>
          <span className={classes.title}>
            <EmailIcon style={{ paddingRight: 5 }} />
            <Link href="mailto:fundacja@doroslidzieciom.org">
              fundacja@doroslidzieciom.org
            </Link>
          </span>

          <Typography align="center" style={{ paddingTop: 50 }}>
            KRS: 0000243743;
          </Typography>
          <Typography align="center">Regon: 260059492</Typography>
          <Typography align="center">NIP: 664-203-19-79</Typography>
          <Typography align="center">
            ING Bank Śląski S.A. o/Starachowice nr 64105014321000002327585606
          </Typography>
        </>
      );
    }
  };
  return (
    <Dialog
      classes={{
        paper: classes.root,
      }}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <span className={classes.title}>
          <img style={{ paddingRight: '10px' }} src={logo} alt="logo" />
          {infoType === InfoType.aboutUs && 'Fundacja Dorośli Dzieciom'}
          {infoType === InfoType.contact && 'Skontaktuj się z nami'}
        </span>
      </DialogTitle>
      <DialogContent>{showContent()}</DialogContent>
      <DialogActions className={classes.title}>
        <CustomButton
          setColor="primary"
          setSize="md"
          onClick={() => closeModal(InfoType.aboutUs)}
        >
          Zamknij
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFddInfo;
