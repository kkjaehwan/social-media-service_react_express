import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

import styled from 'styled-components';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { logoutRequestAction } from '../reducers/user';

const ButtonWrapper = styled(Button)`
    margin-top: 5px;
    width: 100%;
`;
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="posts">Posts<br />{me.Posts.length}</div>,
        <div key="followings">Followings<br />{me.Followings.length}</div>,
        <div key="followings">Followers<br />{me.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={`https://joeschmoe.io/api/v1/${me.nickname[0]}`} style={{ width: 20, height: 20, verticalAlign: 'top', marginBottom: 10 }} />}
        title={me.nickname}
      />
      <ButtonWrapper icon={<UserOutlined />} href="/profile">Profile</ButtonWrapper>
      <ButtonWrapper
        icon={<LogoutOutlined />}
        onClick={onLogOut}
        loading={logOutLoading}
      >Logout
      </ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
