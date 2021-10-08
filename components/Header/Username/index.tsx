import React from "react";
import styled from "styled-components";
import HeaderNavLink from "../NavLink";
import HeaderUsernameText from "./Text";
import {ROUTES} from "../../../utils/routes.utils";

const Wrapper = styled(HeaderNavLink)`
  flex-shrink: 1;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  min-width: 0;
`;

const HeaderUsername = ({ username }: { username: string }) => (
  <Wrapper href={ROUTES.USER({ username })}>
    <HeaderUsernameText>{username}</HeaderUsernameText>
  </Wrapper>
);

export default HeaderUsername;
