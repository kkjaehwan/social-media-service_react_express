import React, { useCallback, useEffect, useMemo } from 'react';
import { Typography, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { BasicGrayDivWrapper } from './styles';

import { ADD_CONTACT_REQUEST } from '../reducers/contact';

const { Title } = Typography;

const ContactForm = () => {
  const dispatch = useDispatch();

  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [text, onChangeText, setText] = useInput('');

  const buttonStyle = useMemo(() => ({ marginTop: 10 }), []);

  const { addContactDone } = useSelector((state) => state.contact);

  useEffect(() => {
    if (addContactDone) {
      setText('');
      setEmail('');
      setNickname('');
    }
  }, [addContactDone]);

  // react form 라이브러리를 나중에 사용해보자
  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('write what you want down.');
    }
    // const formData2 = new FormData();
    // formData2.append('content', text);
    // formData2.append('email', email);
    // formData2.append('nickname', nickname);
    return dispatch({
      type: ADD_CONTACT_REQUEST,
      data: { nickname, email, content: text },
      // data: formData2,
    });
  }, [text, email, nickname]);

  return (
    <>
      <BasicGrayDivWrapper>
        <Title>Contact Form</Title>
        <Form encType="multipart/form-data" onFinish={onSubmitForm}>
          <div>
            <label htmlFor="user-email">Email</label>
            <br />
            <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
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
            placeholder="write what you want down."
          />
          <div style={buttonStyle}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </Form>
      </BasicGrayDivWrapper>
    </>
  );
};

export default ContactForm;
