import React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import { StoreProps } from '@/types/store';
import StoreCard from '@/components/Store/CardItem';
import CustomArrow from './CustomArrow';

interface StoreCarouselProps {
  items: StoreProps[];
}

const CarouselContainer = styled.div`
  width: 100%;

  .slick-slide > div {
    padding: 0 8px;
  }

  .slick-list {
    margin: 0 -8px;
  }
`;

const StoreCarousel: React.FC<StoreCarouselProps> = ({ items }) => {
  const maxSlides = 5;
  const slidesToShow = Math.min(items.length, maxSlides);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: Math.min(slidesToShow, 4),
          slidesToScroll: Math.min(slidesToShow, 4),
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3, // 1280px 이하에서 3개 슬라이드
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <CarouselContainer className="store-carousel">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id}>
            <StoreCard item={{ ...item, price: Number(item.price) }} />
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default StoreCarousel;
