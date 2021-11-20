import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Iframe = ({ src }) => {
  const [widthSize, setWidthSize] = useState('350');
  const [heigthSize, setHeightSize] = useState('350');

  useEffect(() => {
    function onResize() {
      if (document.documentElement.clientWidth < 768) {
        setWidthSize('100%');
        setHeightSize('100%');
      } else {
        setWidthSize(350);
        setHeightSize(350);
      }
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <iframe title={src} src={src} width={widthSize} height={heigthSize} />
  );
};

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
};
export default Iframe;
