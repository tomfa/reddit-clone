import React from "react";
import styled from "styled-components";
import HeaderNavLink from "../NavLink";
import HeaderUsernameText from "./Text";
import { ROUTES } from "../../../utils/routes.utils";

const Wrapper = styled(HeaderNavLink)`
  flex-shrink: 1;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  min-width: 0;
`;

const LargeOnly = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const SmallOnly = styled.span`
  display: none;
  @media (max-width: 768px) {
    display: unset;
  }
`;

const HeaderUsername = ({ username }: { username: string }) => (
  <Wrapper href={ROUTES.USER({ username })}>
    <HeaderUsernameText>
      <LargeOnly>{username}</LargeOnly>
      <SmallOnly>Profile</SmallOnly>
    </HeaderUsernameText>
  </Wrapper>
);

export default HeaderUsername;
