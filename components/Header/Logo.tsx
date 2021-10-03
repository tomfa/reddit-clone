import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { headerItem } from "../shared/helpers";
import NavLink from "../shared/NavLink";

const Logo = styled(NavLink)`
  ${headerItem};

  margin-right: auto;
  font-size: 24px;
  font-weight: 500;
  color: var(--color-normalText);
  text-decoration: none;

  @media (max-width: 425px) {
    padding: 0 8px 0 0;
    font-size: 19px;
  }
`;

const HeaderLogo = () => <Logo href="/">ACO</Logo>;

export default HeaderLogo;
