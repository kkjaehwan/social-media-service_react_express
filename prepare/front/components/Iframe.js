import React from 'react';
import PropTypes from 'prop-types';

const Iframe = ({ src, heigth, width }) => (
  <div>
    <iframe title={src} src={src} height={heigth} width={width} />
  </div>
);

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  heigth: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};
export default Iframe;
