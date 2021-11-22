import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutlined, LockFilled } from '@ant-design/icons';
import useInput from '../hooks/useInput';
import { REMOVE_CONTACT_REQUEST } from '../reducers/contact';

const ContactDeleteForm = ({ contact }) => {
  const contactId = contact.id;
  const dispatch = useDispatch();
  const [password, onChangePassword] = useInput('');
  const { removeContactError,
    removeContactErrorId,
    removeContactLoading,
    removeContactLoadingId } = useSelector((state) => state.contact);

  useEffect(() => {
    if (removeContactErrorId != null && contactId === removeContactErrorId) {
      alert(removeContactError);
    }
  }, [removeContactError, removeContactErrorId, contactId]);

  const onRemoveContact = useCallback(() => {
    dispatch({
      type: REMOVE_CONTACT_REQUEST,
      data: { password, id: contactId },
    });
  }, [password, contactId]);

  return (
    <Form onFinish={onRemoveContact}>
      <Form.Item>
        <Input.Group compact>
          <Input
            size="small"
            placeholder="Password"
            prefix={<LockFilled />}
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
            style={{ width: '70%' }}
          />
          <Button
            size="small"
            type="primary"
            danger
            loading={contactId === removeContactLoadingId && removeContactLoading}
            htmlType="submit"
            icon={<DeleteOutlined />}
          />
        </Input.Group>
      </Form.Item>
    </Form>
  );
};

ContactDeleteForm.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactDeleteForm;
