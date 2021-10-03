import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { link } from "./helpers";

const StyledLinkComponent = styled(Link)`
  ${link};

  font-weight: 500;
  color:  var(--color-normalText);
`;

export default StyledLinkComponent;
