import React from "react";
import styled from "styled-components";
import Markdown from "../../shared/Markdown";

const Wrapper = styled.div`
  margin: 8px -8px;
  border: 1px solid var(--color-border);
  border-left: none;
  border-right: none;
  padding: 8px;
  background-color: var(--color-inputBackground);
`;

const PostContentFullText = (props) => (
  <Wrapper>
    <Markdown>{props.children}</Markdown>
  </Wrapper>
);

export default PostContentFullText;
