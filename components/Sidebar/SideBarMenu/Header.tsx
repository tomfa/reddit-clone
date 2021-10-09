import React from "react";
import styled from "styled-components";
import { wideFont } from "../../shared/helpers";

const SideBarListHeader = styled.span`
  ${wideFont};

  display: block;
  padding: 12px;
  text-align: center;
  color: var(--color-mutedText);
`;

export default SideBarListHeader;
