import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Space, Button } from 'antd';
import { REMOVE_CONTACT_REQUEST } from '../reducers/contact';

const { Column } = Table;

const ContactsTable = ({ contacts }) => {
  const dispatch = useDispatch();

  const onRemoveContact = useCallback((id) => {
    dispatch({
      type: REMOVE_CONTACT_REQUEST,
      data: id,
    });
  }, []);

  return (
    <>
      <Table dataSource={contacts}>
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Name" dataIndex="nickname" key="nickname" />
        <Column title="Content" dataIndex="content" key="content" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space key={record.key} size="middle">
              <Button type="danger" onClick={() => onRemoveContact(record.id)}>Delete</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

ContactsTable.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      key: PropTypes.string,
      email: PropTypes.string,
      content: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};

export default ContactsTable;
