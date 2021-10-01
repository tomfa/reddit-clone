import React from "react";
import styled from "styled-components";
import { wideFont } from "../../shared/helpers";

const Header = styled.span`
  ${wideFont};

  display: block;
  padding: 12px;
  text-align: center;
  color: var(--color-mutedText);
`;

const SidebarCategoryListHeader = () => <Header>categories</Header>;

export default SidebarCategoryListHeader;
