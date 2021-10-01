import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { headerItem } from "../shared/helpers";

const Logo = styled(Link)`
  ${headerItem};

  margin-right: auto;
  font-size: 24px;
  font-weight: 500;
  color:  var(--color-normalText);
  text-decoration: none;

  @media (max-width: 425px) {
    padding: 0 8px 0 16px;
    font-size: 19px;
  }
`;

const HeaderLogo = () => <Logo to="/">asperitas</Logo>;

export default HeaderLogo;
