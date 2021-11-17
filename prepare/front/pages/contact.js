import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import { Typography, Row, Col } from 'antd';
import { AlertOutlined, CrownTwoTone, EnvironmentTwoTone, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import ContactForm from '../components/ContactForm';
import Iframe from '../components/Iframe';

import { BasicGrayDivWrapper, BasicWhiteDivWrapper } from '../components/styles';
import ContactsTable from '../components/ContactsTable';
import { LOAD_CONTACTS_REQUEST } from '../reducers/contact';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const { Title, Paragraph, Text } = Typography;

const Contact = () => {
  const dispatch = useDispatch();
  const { mainContacts } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch({
      type: LOAD_CONTACTS_REQUEST,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Contact | ShareKnot</title>
      </Head>
      <AppLayout>
        <Row gutter={12}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <BasicWhiteDivWrapper>
              <Title><CrownTwoTone /> Jaehwan Kim </Title>
              <Paragraph>
                <Text>
                  Feel free to text me.<br />
                  I am available 08:00-17:00 Eastern Time
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <PhoneOutlined /> +1 (647) 572-3933<br />
                  <MailOutlined /> kkjaehwan@gmail.com
                </Text>
              </Paragraph>
              <Paragraph>
                Do you want to develop or maintain your web site?
                <br />
                Simply fill out and submit the contact form and
                I’ll get back to you as soon as possible.
              </Paragraph>

              <Paragraph>
                <Text type="danger">
                  <AlertOutlined /> unfortunately calling is not available
                  because of a lots of scam calling.
                  I will get back to you as soon as possible.
                </Text>
              </Paragraph>
            </BasicWhiteDivWrapper>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <ContactForm />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <BasicWhiteDivWrapper>
              <Title><EnvironmentTwoTone /> Working Area</Title>
              <Paragraph>
                <Text>
                  Preferred Working Area : Toronto<br />
                  Working Available Area : GTA<br />
                  Living Area : near by Kipling Station
                </Text>
              </Paragraph>
            </BasicWhiteDivWrapper>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <BasicGrayDivWrapper>
              <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11550.01206377162!2d-79.53270614147182!3d43.63770187235203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b37bfb3bbec9f%3A0x28893c9667f30d2e!2sKipling!5e0!3m2!1sko!2sca!4v1631725452548!5m2!1sko!2sca" width="100%" height="100%" />
            </BasicGrayDivWrapper>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <ContactsTable key={mainContacts} contacts={mainContacts} />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

// server side rendering.
// getInitialProps    : next 8.x will be deprecated
// getStaticProps     : next 9.x 서버 사이드 랜더링 후 HTML 보관
// getStaticPath      : next 9.x
// getServerSideProps : next 9.x 서버 사이드 랜더링이라도 값이 변하는 내용을 대상으로 함
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // 서버사이드 랜더링 로그인 등 쿠키 문제 해결
    // 브라우져에서 쿠키를 보내주는게 아니라 프론트 서버에서 보내주는 것임.
    // 프론트 서버에서 보관중인 쿠키를 back으로 전달해줌
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) { // 쿠키 공유 문제 해결
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    store.dispatch(END); // 리덕스 사가에서 서버사이드 랜더링이 Success될때 까지 기다리도록 함.
    await store.sagaTask.toPromise();
  },
);
export default Contact;
