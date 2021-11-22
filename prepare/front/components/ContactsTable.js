import React from 'react';
import PropTypes from 'prop-types';
import { Table, Space } from 'antd';
import styled from 'styled-components';
import ContactDeleteForm from './ContactDeleteForm';

const { Column } = Table;

const ColumnWrapper = styled(Column)`
  white-space: pre-line;
  word-break: break-all;
`;

const ContactsTable = ({ contacts }) => (
  <>
    <Table dataSource={contacts} scroll={{ x: 320 }}>
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Name" dataIndex="nickname" key="nickname" />
      <ColumnWrapper title="Content" dataIndex="content" key="content" />
      <Column
        title="Action"
        key="action"
        fixed="right"
        width="100"
        render={(text, record) => (
          <Space key={record.key} size="middle">
            <ContactDeleteForm contact={record} />
          </Space>
        )}
      />
    </Table>
  </>
);

ContactsTable.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      key: PropTypes.number,
      email: PropTypes.string,
      content: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};

export default ContactsTable;
