import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="https://shareknot.com/favicon.ico" />
          <meta property="og:url" content={`https://shareknot.com/user/${id}`} />
        </Head>
      )}
      {userInfo && (userInfo.id !== me?.id)
        ? (
          <Card
            style={{ marginBottom: 20 }}
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

// server side rendering.
// getInitialProps    : next 8.x will be deprecated
// getStaticProps     : next 9.x 서버 사이드 랜더링 후 HTML 보관
// getStaticPath      : next 9.x getStaticProps와 같이 쓰고 다이나믹 라우팅일때 사용된다.
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
      type: LOAD_USER_POSTS_REQUEST,
      data: context.params.id,
    });
    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    store.dispatch({
      type: LOAD_USER_REQUEST,
      data: context.params.id,
    });
    store.dispatch(END); // 리덕스 사가에서 서버사이드 랜더링이 Success될때 까지 기다리도록 함.
    await store.sagaTask.toPromise();
  },
);
export default User;
