import React from 'react';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import { useStyles } from './AdminNewsPageStyle';
import image from '../../../images/jumbotronAdmin.jpg';

const AdminNewsPage: React.FC = () => {
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
        <p style={{ color: '#fff' }}>Admin News Page</p>
      </div>
    </div>
  );
};

export default AdminNewsPage;
