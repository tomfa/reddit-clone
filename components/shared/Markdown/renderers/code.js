import React from "react";
import styled from "styled-components";

const Pre = styled.pre`
  border-radius: 2px;
  padding: 12px 16px;
  background-color: var(--color-text);
  overflow-x: scroll;
`;

const codeRenderer = (props) => (
  <Pre>
    <code>{props.value}</code>
  </Pre>
);

export default codeRenderer;
