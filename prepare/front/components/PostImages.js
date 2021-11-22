import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const ImgStyle = styled.img`
    max-height:500px; 
    max-width: 500px;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  `;
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <div style={{ textAlign: 'center' }}> <ImgStyle role="presentation" src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} /></div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <ImgStyle role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <ImgStyle role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <ImgStyle role="presentation" style={{ width: '50%' }} src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          view more {images.length - 1} pictures
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
