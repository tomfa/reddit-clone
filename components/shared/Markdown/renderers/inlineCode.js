import React from "react";
import styled from "styled-components";

const InlineCode = styled.code`
  border-radius: 2px;
  padding: 0.2em 0.4em;
  background-color: ${(props) => props.theme.pageBackground};
`;

const inlineCodeRenderer = (props) => <InlineCode {...props} />;

export default inlineCodeRenderer;
