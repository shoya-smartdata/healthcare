// components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import Card from './Card';


const Carousel = ({ items }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
    return (
      <div className="mt-8">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index} className="p-4">
              <Card title={item.title} description={item.description} image={item.image} />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
export default Carousel;
