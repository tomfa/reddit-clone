import React from "react";
import styled from "styled-components";
import SidebarCreatePostButton from "./CreatePostButton";
import SidebarCategoryList from "./CategoryList";
import { useUserData } from "../../lib/hooks";

const Wrapper = styled.aside`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-basis: 240px;
  margin-left: 24px;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background-color: var(--color-foreground);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  const { isLoggedIn } = useUserData();
  return (
    <Wrapper>
      {isLoggedIn && <SidebarCreatePostButton />}
      <SidebarCategoryList />
    </Wrapper>
  );
};

export default Sidebar;
