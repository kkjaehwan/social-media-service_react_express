import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import { Card, Avatar } from 'antd';

import AppLayout from '../components/AppLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>{userInfo.id} | ShareKnot</title>
      </Head>
      <AppLayout>
        <Card
          actions={[
            <div key="twit">짹짹<br />{userInfo.Posts}</div>,
            <div key="followings">팔로잉<br />{userInfo.Followings}</div>,
            <div key="followings">팔로워<br />{userInfo.Followers}</div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      </AppLayout>
    </>
  );
};

// server side rendering.
// getInitialProps    : next 8.x will be deprecated
// getStaticProps     : next 9.x 서버 사이드 랜더링 후 HTML 보관
// getStaticPath      : next 9.x
// getServerSideProps : next 9.x 서버 사이드 랜더링이라도 값이 변하는 내용을 대상으로 함
export const getStaticProps = wrapper.getStaticProps(
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
      type: LOAD_USER_REQUEST,
      data: 4,
    });
    store.dispatch(END); // 리덕스 사가에서 서버사이드 랜더링이 Success될때 까지 기다리도록 함.
    await store.sagaTask.toPromise();
  },
);
export default About;
