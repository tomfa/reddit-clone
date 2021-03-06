import styled from "styled-components";
import { fade, smallFont } from "../helpers";

const Error = styled.span`
  ${fade};
  ${smallFont};

  position: absolute;
  right: 0;
  top: 0;
  color: var(--color-error);
`;

export default Error;
