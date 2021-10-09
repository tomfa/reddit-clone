import React from "react";
import styled from "styled-components";
import { smallFont } from "./helpers";

const Wrapper = styled.div<{ comments: boolean }>`
  ${smallFont};

  width: 100%;

  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 48px 0;
  margin: 0;
  background-color: var(--color-foreground);
  text-align: center;
  color: var(--color-mutedText);

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const Empty = ({ comments = false }: { comments?: boolean }) => {
  const message = comments ? "no comments" : "there's nothing here...";
  return <Wrapper comments={comments}>{message}</Wrapper>;
};

export default Empty;
