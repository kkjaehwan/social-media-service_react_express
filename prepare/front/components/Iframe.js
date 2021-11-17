import React from 'react';
import PropTypes from 'prop-types';

const Iframe = ({src, heigth, width}) => {
    return (
        <div>
            <iframe src={src} height={heigth} width={width} />
        </div>
    );
}

Iframe.propTypes = {
    src: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
};
export default Iframe;