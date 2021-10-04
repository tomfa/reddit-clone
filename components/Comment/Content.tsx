import React from "react";
import styled from "styled-components";
import Markdown from "../shared/Markdown";

const Content = styled.div`
  padding: 12px;
`;

const CommentContent = (props: { children: string }) => (
  <Content>
    <Markdown>{props.children}</Markdown>
  </Content>
);

export default CommentContent;
