import styled from "styled-components";
import { transition } from "../helpers";

const Input = styled.input<{ error: boolean }>`
  ${transition("border", "box-shadow")};

  border: none;
  box-shadow: 0 0 0 1px var(--color-border);

  display: block;
  border-radius: 3px;
  width: 100%;
  padding: 8px;
  background-color: var(--color-inputBackground);
  font-size: 15px;
  color: var(--color-text);
  appearance: none;
  outline: none;
  resize: vertical;

  :hover,
  :focus {
    box-shadow: 0 0 0 1px var(--color-blue);
  }
`;

export default Input;
