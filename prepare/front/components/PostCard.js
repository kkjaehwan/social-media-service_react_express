import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Popover, Button, Avatar, List, Comment, Badge, Tooltip } from 'antd';
import {
  MessageOutlined,
  EllipsisOutlined,
  LikeTwoTone,
  LikeOutlined,
  ReloadOutlined,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';

import Text from 'antd/lib/typography/Text';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST, UPDATE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const id = useSelector((state) => state.user.me?.id);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback((editText) => () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: editText,
      },
    });
  }, [post]);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('You need to log in.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('You need to log in.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('You need to log in.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('You need to log in.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers?.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <div
            role="button"
            onClick={liked ? onUnlike : onLike}
            onKeyDown={liked ? onUnlike : onLike}
            tabIndex={0}
          >
            <Badge color="#FF1493" size="small" count={post.Likers.length}>
              {liked
                ? <LikeTwoTone twoToneColor="#FF1493" key="heart" />
                : <LikeOutlined key="heart" />}
              <div>Like</div>
            </Badge>
          </div>,
          <div
            role="button"
            onClick={onToggleComment}
            onKeyDown={onToggleComment}
            tabIndex={0}
          >
            <Badge color="gray" size="small" count={post.Comments.length}><MessageOutlined key="comment" /></Badge>
            <div>Comment</div>
          </div>,
          <div
            role="button"
            onClick={onRetweet}
            onKeyDown={onRetweet}
            tabIndex={0}
          >
            <ReloadOutlined key="retweet" />
            <div>Repost</div>
          </div>,
          <div>
            <Popover
              key="more"
              content={(
                <Button.Group>
                  {id && post.User.id === id
                    ? (
                      <>
                        {
                          !post.RetweetId && (
                            <Button
                              icon={<FormOutlined />}
                              style={{ marginRight: 5 }}
                              onClick={onClickUpdate}
                            >Modify
                            </Button>
                          )
                        }
                        <Button
                          icon={<DeleteOutlined />}
                          type="danger"
                          loading={removePostLoading}
                          onClick={onRemovePost}
                        >Delete
                        </Button>
                      </>
                    )
                    : <Button>Report</Button>}
                </Button.Group>
              )}
            >
              <EllipsisOutlined />
            </Popover>
            <div>Options</div>
          </div>,
        ]}
        title={post.RetweetId ? `${post.User.nickname} reposted it` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <div style={{ float: 'right' }}>
                <Text code>
                  {moment(post.createdAt).format('YYYY-MM-DD')}
                </Text>
              </div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                    <a><Avatar src={`https://joeschmoe.io/api/v1/${post.Retweet.User.nickname[0]}`} style={{ width: 20, height: 20, verticalAlign: 'top' }} /></a>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={(
                  <PostCardContent
                    postData={post.Retweet.content}
                    onChangePost={onChangePost}
                    onCancelUpdate={onCancelUpdate}
                  />
                )}
              />
            </Card>
          )
          : (
            <>
              <div style={{ float: 'right' }}>
                <Text code>
                  {moment(post.createdAt).format('YYYY-MM-DD')}
                </Text>
              </div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.User.id}`} prefetch={false}>
                    <a><Avatar src={`https://joeschmoe.io/api/v1/${post.User.nickname[0]}`} style={{ width: 20, height: 20, verticalAlign: 'top' }} /></a>
                  </Link>
                )}
                title={post.User.nickname}
                description={(
                  <PostCardContent
                    editMode={editMode}
                    onChangePost={onChangePost}
                    onCancelUpdate={onCancelUpdate}
                    postData={post.content}
                  />
                )}
              />
            </>
          )}
      </Card>
      {commentFormOpened && (
        <div>
          {id && <CommentForm post={post} />}
          <List
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a><Avatar src={`https://joeschmoe.io/api/v1/${item.User.nickname[0]}`} /></a>
                    </Link>
                  )}
                  content={item.content}
                  datetime={(
                    <Tooltip>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Tooltip>
                  )}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
