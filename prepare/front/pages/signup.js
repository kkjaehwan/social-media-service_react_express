import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button, Col, Row } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import AppTopLayout from '../components/AppTopLayout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <>
      <AppTopLayout />
      <Row gutter={12}>
        <Col xs={24} md={8} />
        <Col xs={24} md={8}>
          <Head>
            <title>Sign up | TossKnot</title>
          </Head>
          <Form onFinish={onSubmit}>
            <div>
              <label htmlFor="user-email">Email</label>
              <br />
              <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
            </div>
            <div>
              <label htmlFor="user-nick">Nickname</label>
              <br />
              <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
            </div>
            <div>
              <label htmlFor="user-password">Password</label>
              <br />
              <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
              <label htmlFor="user-password-check">Confirm Password</label>
              <br />
              <Input
                name="user-password-check"
                type="password"
                value={passwordCheck}
                required
                onChange={onChangePasswordCheck}
              />
              {passwordError && <ErrorMessage>The password doesn&apos;t match.</ErrorMessage>}
            </div>
            <div>
              <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>I agree to the terms and conditions.</Checkbox>
              {termError
                && <ErrorMessage>You have to agree to the terms and conditions.</ErrorMessage>}
            </div>
            <div style={{ marginTop: 10 }}>
              <Button type="primary" htmlType="submit" loading={signUpLoading}>Sign Up</Button>
            </div>
          </Form>
        </Col>
        <Col xs={24} md={8} />
      </Row>
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
export default Signup;
