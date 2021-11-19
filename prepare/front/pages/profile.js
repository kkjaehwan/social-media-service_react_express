import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | TossKnot</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
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
    store.dispatch(END); // 리덕스 사가에서 서버사이드 랜더링이 Success될때 까지 기다리도록 함.
    await store.sagaTask.toPromise();
  },
);
export default Profile;
