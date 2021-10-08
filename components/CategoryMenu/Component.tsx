import React from "react";
import styled from "styled-components";
import CategoryMenuDropdown from "./Dropdown";
import CategoryMenuCreatePostButton from "./CreatePostButton";
import {getCurrentCategory, useUserData} from "../../lib/hooks";

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
  const category = getCurrentCategory() || 'all';
  const { isLoggedIn } = useUserData();
  return (
    <Menu>
      <CategoryMenuDropdown
        category={category}
      />
      {isLoggedIn && <CategoryMenuCreatePostButton/>}
    </Menu>
  )
};

export default CategoryMenu;
