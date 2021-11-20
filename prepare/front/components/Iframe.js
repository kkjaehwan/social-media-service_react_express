import React from 'react';
import PropTypes from 'prop-types';

const Iframe = ({ src, height, width }) => (
  <div>
    <iframe title={src} src={src} height={height} width={width} />
  </div>
);

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};
export default Iframe;
