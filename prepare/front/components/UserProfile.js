import React, { useCallback } from 'react';
import Link from 'next/link';
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
        <div key="posts"><Link href={`/user/${me.id}`}><a>Posts<br />{me.Posts.length}</a></Link></div>,
        <div key="followings"><Link href="/profile"><a>Followings<br />{me.Followings.length}</a></Link></div>,
        <div key="followings"><Link href="/profile"><a>Followers<br />{me.Followers.length}</a></Link></div>,
      ]}
    >
      <Card.Meta
        avatar={(
          <Link href={`/user/${me.id}`} prefetch={false}>
            <Avatar
              src={`https://joeschmoe.io/api/v1/${me.nickname[0]}`}
              style={{ width: 20, height: 20, marginBottom: 5 }}
            />
          </Link>
        )}
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
