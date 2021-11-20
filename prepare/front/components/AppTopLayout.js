import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input } from 'antd';
import { useSelector } from 'react-redux';
import { HomeFilled } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';
import { Router } from 'next/router';
import useInput from '../hooks/useInput';

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child{
    padding-left: 0 !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const AppTopLayout = () => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="home" icon={<HomeFilled />}><Link href="/"><a>TossKnot</a></Link></Menu.Item>
        {me ? <Menu.Item key="profile"><Link href="/profile"><a>Profile</a></Link></Menu.Item> : <></>}
        <Menu.Item key="conract"><Link href="/contact"><a>Contact</a></Link></Menu.Item>
        <Menu.Item key="search">
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AppTopLayout;
