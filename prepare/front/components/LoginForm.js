import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { LockFilled, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';
import GoogleLoginButton from './GoogleLoginButton';
import { backUrl } from '../config/config';

const FormWrapper = styled(Form)`
  padding: 10px;
  div {
    margin-top: 5px;
  }
  Button {
    margin-top: 5px;
    width: 100%;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    // console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <Input placeholder="Email" prefix={<UserOutlined />} name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <Input
          placeholder="Password"
          prefix={<LockFilled />}
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <Button type="primary" htmlType="submit" loading={logInLoading} icon={<LoginOutlined />}>Login</Button>
      <GoogleLoginButton loading={logInLoading} />
      <Link href="/signup"><a><Button icon={<UserAddOutlined />}>Sign-Up</Button></a></Link>
      <Link href={`${backUrl}/google/signup`}><a><Button icon={<UserAddOutlined />}>Sign-Up with Google</Button></a></Link>
    </FormWrapper>
  );
};

export default LoginForm;
