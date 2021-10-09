import React from "react";
import styled from "styled-components";
import SidebarCreatePostButton from "./CreatePostButton";
import SidebarCategoryList from "./CategoryList";
import { useCurrentCategory, useUserData } from "../../lib/hooks";

const Wrapper = styled.aside`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-basis: 240px;
  margin-left: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background-color: var(--color-foreground);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  const category = useCurrentCategory();
  const { isLoggedIn } = useUserData();
  return (
    <Wrapper>
      {isLoggedIn && <SidebarCreatePostButton category={category} />}
      <SidebarCategoryList activeCategory={category || "all"} />
    </Wrapper>
  );
};

export default Sidebar;
