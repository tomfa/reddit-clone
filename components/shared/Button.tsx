import styled from "styled-components";
import { transition, wideFont } from "./helpers";

const Button = styled.button<{ hidden?: boolean }>`
  ${transition("filter", "box-shadow")};
  ${wideFont};
  
  ${p =>p.hidden && 'display: none;'}

  border: none;
  border-radius: 3px;
  padding: 8px 24px;
  background-color: var(--color-blue);
  cursor: pointer;
  color: #ffffff;
  outline: none;

  :hover {
    filter: brightness(110%);
  }

  :active {
    filter: brightness(90%);
  }

  :focus {
    box-shadow: 0 0 0 2px  var(--color-blue);
  }
`;

export default Button;
