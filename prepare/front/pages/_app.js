// pages들의 공통된것 처리하는 곳.
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';
import { backUrl } from '../config/config';

const TossKnot = ({ Component }) => {
  console.log('node_env', process.env.NODE_ENV);
  console.log('backUrl', backUrl);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>TossKnot</title>
      </Head>
      <Component />
    </>
  );
};

TossKnot.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(TossKnot);
