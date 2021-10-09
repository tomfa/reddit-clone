import React from "react";
import styled from "styled-components";
import CategoryMenuDropdown from "./CategoryLinkDropdown";
import CategoryMenuCreatePostButton from "./CreatePostButton";
import { useCurrentCategory, useUserData } from "../../lib/hooks";

const Menu = styled.nav`
  display: none;
  border: 1px solid var(--color-border);
  border-left: none;
  border-right: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const CategoryMenu = () => {
  const category = useCurrentCategory() || "all";
  const { isLoggedIn } = useUserData();
  return (
    <Menu>
      <CategoryMenuDropdown category={category} />
      {isLoggedIn && <CategoryMenuCreatePostButton category={category} />}
    </Menu>
  );
};

export default CategoryMenu;
