// pages들의 공통된것 처리하는 곳.
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';
import { backUrl } from '../config/config';

const ShareKnot = ({ Component }) => {
  console.log('node_env', process.env.NODE_ENV);
  console.log('backUrl', backUrl);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>ShareKnot</title>
      </Head>
      <Component />
    </>
  );
};

ShareKnot.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(ShareKnot);
