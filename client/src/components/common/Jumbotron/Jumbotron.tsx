import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Props, useStyles } from './JumbotronStyle';

const Jumbotron: React.FC<Props> = (props) => {
  const { filter, children, style, image, small } = props;
  const classes = useStyles();
  const jumbotronClasses = classNames({
    [classes.main]: true,
    [classes.filter]: filter,
    [classes.small]: small,
  });

  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }

  const [transform, setTransform] = useState<string>(
    'translate3d(0,' + windowScrollTop + 'px,0)'
  );

  useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }
    return () => {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform);
      }
    };
  });

  const resetTransform = (): void => {
    let windowScrollTop = window.pageYOffset / 3;
    setTransform('translate3d(0,' + windowScrollTop + 'px,0)');
  };

  return (
    <div
      className={jumbotronClasses}
      style={{
        ...style,
        transform: transform,
        backgroundImage: `url(${image})`,
      }}
    >
      {children}
    </div>
  );
};

export default Jumbotron;
