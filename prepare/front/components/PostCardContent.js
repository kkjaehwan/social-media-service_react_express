import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DivWrapper = styled.div`
  white-space: pre-line;
  word-break: break-all;
`;
const PostCardContent = ({ postData }) => (
  <DivWrapper>
    {
      postData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link
              href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })
    }
  </DivWrapper>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
