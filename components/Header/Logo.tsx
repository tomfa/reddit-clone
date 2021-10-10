import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { headerItem } from "../shared/helpers";
import NavLink from "../shared/NavLink";
import { ROUTES } from "../../utils/routes.utils";
import { config } from "../../lib/config";

const Logo = styled(NavLink)`
  ${headerItem};

  margin-right: auto;
  font-size: 24px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;

  @media (max-width: 425px) {
    padding: 0 8px 0 0;
    font-size: 19px;
  }
`;

const HeaderLogo = () => <Logo href={ROUTES.HOME()}>{config.title}</Logo>;

export default HeaderLogo;
