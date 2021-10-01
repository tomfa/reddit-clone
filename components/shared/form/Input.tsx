import styled from "styled-components";
import { transition } from "../helpers";

const Input = styled.input<{ error: boolean }>`
  ${transition("border", "box-shadow")};

  border: 1px solid black;
  --border: ${(props) =>
    props.error ? props.theme.error : '--color-blue'};

  display: block;
  border-radius: 3px;
  width: 100%;
  padding: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  font-size: 15px;
  color: ${(props) => props.theme.normalText};
  appearance: none;
  outline: none;
  resize: vertical;

  :hover,
  :focus {
    box-shadow: 0 0 0 1px var(--color-text);
  }
`;

export default Input;
