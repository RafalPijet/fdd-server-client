import {
  ExitToApp,
  HowToReg,
  Comment,
  Message,
  Search,
} from '@material-ui/icons';
import RateReviewSharpIcon from '@material-ui/icons/RateReviewSharp';
import { MessageOptions, ServiceOptions } from '../types/global';
import { ItemNaviProps } from '../components/common/CustomBottomNavigation/CustomBottomNavigation';

export const naviLoginData: ItemNaviProps[] = [
  {
    label: 'Logowanie',
    value: ServiceOptions.login,
    icon: <ExitToApp />,
  },
  {
    label: 'Rejestracja',
    value: ServiceOptions.register,
    icon: <HowToReg />,
  },
];

export const naviMessagesData: ItemNaviProps[] = [
  {
    label: 'Przychodzące',
    value: MessageOptions.incoming,
    icon: <Message />,
  },
  {
    label: 'Wychodzące',
    value: MessageOptions.outcoming,
    icon: <Comment />,
  },
  {
    label: 'Wszystkie',
    value: MessageOptions.all,
    icon: (
      <span>
        <Message />
        <Comment />
      </span>
    ),
  },
  {
    label: 'Nowa',
    value: MessageOptions.new,
    icon: <RateReviewSharpIcon />,
  },
];

export const naviAdminMessagesData: ItemNaviProps[] = [
  {
    label: 'Szukaj',
    value: MessageOptions.search,
    icon: <Search />,
  },
  ...naviMessagesData,
];
