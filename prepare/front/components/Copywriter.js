import React, { useMemo } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const CopywriterWrapper = styled.div`
padding: 10px;
background: #002766;
text-align:center;
`;

/* const TitleWrapper = styled(Typography.Title)`
color: white;
`; */

const Copywriter = () => {
  const titleStyle = useMemo(() => ({ color: 'white' }), []);
  return (
    <CopywriterWrapper>
      <Title style={titleStyle}>Other portfolios</Title>
      <a href="http://35.183.65.222:8081/ownner-profile" target="_blank" rel="noreferrer noopener">Java Spring Boot </a>
    </CopywriterWrapper>
  );
};

export default Copywriter;
