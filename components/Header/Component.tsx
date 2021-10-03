import React, { useCallback } from "react";
import styled from "styled-components";
import HeaderLogo from "./Logo";
import HeaderUsername from "./Username";
import HeaderNavLink from "./NavLink";
import { useUserData } from "../../lib/hooks";
import { useRouter } from "next/router";

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px var(--color-shadow);
  border-bottom: 1px solid var(--color-border);
  height: 48px;
  justify-content: center;
  background-color: var(--color-foreground);
  user-select: none;
  width: 100%;

  @media (max-width: 425px) {
    margin-bottom: 16px;
    height: 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;

const NavActions = styled.div`
  display: flex;
`;

const Header = () => {
  const router = useRouter();
  const { username, isLoggedIn } = useUserData();
  const logout = useCallback(() => router.push("/logout"), [router]);
  return (
    <Wrapper>
      <InnerWrapper>
        <HeaderLogo />
        {isLoggedIn ? (
          <NavActions>
            <HeaderUsername username={username} />
            <HeaderNavLink onClick={logout}>log out</HeaderNavLink>
          </NavActions>
        ) : (
          <NavActions>
            <HeaderNavLink href="/login">log in</HeaderNavLink>
            <HeaderNavLink href="/signup">sign up</HeaderNavLink>
          </NavActions>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default Header;
