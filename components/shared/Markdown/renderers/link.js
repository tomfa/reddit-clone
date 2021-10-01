import React from "react";
import styled from "styled-components";
import { transition } from "../../helpers";

const Link = styled.a`
  ${transition("color")};

  text-decoration: underline;
  color: var(--color-blue);

  :hover {
    filter: brightness(110%);
  }
`;

const linkRenderer = (props) => <Link {...props} />;

export default linkRenderer;
