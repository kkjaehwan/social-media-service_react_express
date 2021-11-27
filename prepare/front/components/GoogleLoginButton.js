import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const onFailure = (error) => {
    console.log(error);
  };

  const onSuccess = useCallback((response) => {
    dispatch(loginRequestAction({ tokenId: response.tokenId }));
  }, []);

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        // buttonText="Login with Google"
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            icon={<LoginOutlined />}
          > Login with Google
          </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default GoogleLoginButton;
