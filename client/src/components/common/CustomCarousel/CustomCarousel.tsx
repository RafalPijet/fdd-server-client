import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import image7 from '../../../images/image (3).jpeg';
import image8 from '../../../images/image (4).jpeg';
import image9 from '../../../images/image (5).jpeg';
import image10 from '../../../images/image (6).jpeg';

const CustomCarousel: React.FC = () => {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop
      autoPlay
      useKeyboardArrows
      interval={5000}
      transitionTime={1000}
    >
      <div>
        <img src={image7} />
        <p className="legend">Legend 7</p>
      </div>
      <div>
        <img src={image8} />
        <p className="legend">Legend 8</p>
      </div>
      <div>
        <img src={image9} />
        <p className="legend">Legend 9</p>
      </div>
      <div>
        <img src={image10} />
        <p className="legend">Legend 10</p>
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
