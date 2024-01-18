/* eslint-disable @next/next/no-img-element */
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.css';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

interface Props {
  images: string[];
}

export default function ThumbnailCarousel({ images }: Props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const height = mobile ? 250 : 350;
  return (
    <div className={styles.carousel}>
      <Carousel autoPlay infiniteLoop transitionTime={500}>
        {images.map((image) => (
          <div key={image}>
            <img src={image} alt="Todo" height={height} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
