import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Typography, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ContactsOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { BasicGrayDivWrapper } from './styles';

import { ADD_CONTACT_REQUEST } from '../reducers/contact';

const { Title } = Typography;

const ErrorMessage = styled.div`
  color: red;
`;

const ContactForm = () => {
  const dispatch = useDispatch();

  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [text, onChangeText, setText] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const buttonStyle = useMemo(() => ({ marginTop: 10 }), []);

  const { addContactDone, addContactLoading } = useSelector((state) => state.contact);

  useEffect(() => {
    if (addContactDone) {
      setText('');
      setEmail('');
      setNickname('');
      setPassword('');
      setPasswordCheck('');
    }
  }, [addContactDone]);

  // react form 라이브러리를 나중에 사용해보자
  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('write your message');
    }
    // const formData2 = new FormData();
    // formData2.append('content', text);
    // formData2.append('email', email);
    // formData2.append('nickname', nickname);
    return dispatch({
      type: ADD_CONTACT_REQUEST,
      data: { nickname, email, content: text, password },
      // data: formData2,
    });
  }, [text, email, nickname, password]);

  return (
    <>
      <BasicGrayDivWrapper>
        <Title><ContactsOutlined /> Contact Form</Title>
        <Form encType="multipart/form-data" onFinish={onSubmitForm}>
          <div>
            <label htmlFor="user-email">Email</label>
            <br />
            <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
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
            <label htmlFor="user-nickname">Name</label>
            <br />
            <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
          </div>
          <Input.TextArea
            value={text}
            onChange={onChangeText}
            maxLength={140}
            placeholder="write your message."
            style={buttonStyle}
          />
          <div style={buttonStyle}>
            <Button type="primary" loading={addContactLoading} htmlType="submit">Submit</Button>
          </div>
        </Form>
      </BasicGrayDivWrapper>
    </>
  );
};

export default ContactForm;
