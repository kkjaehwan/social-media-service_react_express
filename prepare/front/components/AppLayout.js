import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import Copywriter from './Copywriter';
import AppTopLayout from './AppTopLayout';

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child{
    padding-left: 0 !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Global />
      <AppTopLayout />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me
            ? <UserProfile />
            : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
      </Row>
      <Row gutter={8}>
        <Col xs={24} md={24}>
          <Copywriter />
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
