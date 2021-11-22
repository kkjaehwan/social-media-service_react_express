import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';

const DivWrapper = styled.div`
  white-space: pre-line;
  word-break: break-all;
`;
const { TextArea } = Input;
const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  });

  return (
    <div>
      {editMode
        ? (
          <>
            <TextArea value={editText} onChange={onChangeText} style={{ marginBottom: 5 }} />
            <Button.Group style={{ float: 'right' }}>
              <Button
                icon={<FormOutlined />}
                loading={updatePostLoading}
                onClick={onChangePost(editText)}
                style={{ marginRight: 5 }}
              >Modify
              </Button>
              <Button
                icon={<CloseOutlined />}
                type="danger"
                onClick={onCancelUpdate}
              >Cancel
              </Button>
            </Button.Group>
          </>
        )
        : (
          <DivWrapper>{
            postData.split(/(#[^\s#]+)/g).map((v) => {
              if (v.match(/(#[^\s#]+)/)) {
                return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={v}><a>{v}</a></Link>;
              }
              return v;
            })
          }
          </DivWrapper>
        )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onChangePost: PropTypes.func.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
