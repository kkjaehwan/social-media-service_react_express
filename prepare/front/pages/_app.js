// pages들의 공통된것 처리하는 곳.
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const TossKnot = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>TossKnot</title>
    </Head>
    <Component />
  </>
);

TossKnot.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(TossKnot);
