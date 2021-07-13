import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  images: string[];
  isAutoPlay: boolean;
}

const CustomCarousel: React.FC<Props> = (props) => {
  const { images, isAutoPlay } = props;
  return (
    <Carousel
      autoFocus
      infiniteLoop
      autoPlay={isAutoPlay}
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
