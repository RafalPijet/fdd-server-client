import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  images: string[];
}

const CustomCarousel: React.FC<Props> = (props) => {
  const { images } = props;
  return (
    <Carousel
      showArrows={false}
      showThumbs={true}
      infiniteLoop
      autoPlay
      useKeyboardArrows
      interval={5000}
      transitionTime={1000}
    >
      {images.map((image: string) => (
        <div key={image}>
          <img src={image} alt={image} />
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
