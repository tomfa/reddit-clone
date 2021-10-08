import React from "react";
import styled from "styled-components";
import { transition } from "../shared/helpers";

const TextArea = styled.textarea`
  ${transition("border", "box-shadow")};

  box-shadow: 0 0 0 1px var(--color-border);
  display: block;
  width: 100%;
  padding: 8px;
  background-color: var(--color-inputBackground);
  font-size: 15px;
  color: var(--color-normalText);
  appearance: none;
  outline: none;
  resize: vertical;
  margin: 0;
  border: none;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;

  :hover,
  :focus {
    border: none;
    border-bottom: 1px solid var(--color-border);
    box-shadow: none;
  }
`;

export default TextArea;
