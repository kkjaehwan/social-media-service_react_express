import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, Global } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // esc 눌렀을 때 화면 닫힘.
  useEffect(
    () => {
      const handleKeyPress = (e) => e.keyCode === 27 && onClose();

      window.addEventListener('keyup', handleKeyPress);

      return () => {
        window.removeEventListener('keyup', handleKeyPress);
      };
    },
    [],
  );
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>Image Detail</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {' '}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
