import React from "react";
import styled from "styled-components";
import SidebarCategoryListItem from "./Item";
import SidebarCategoryListHeader from "./Header";
import {config} from "../../../lib/config";

const CategoryList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const SidebarCategoryList = () => (
  <CategoryList>
    <SidebarCategoryListHeader />
    {config.categories.map((category, index) => (
      <SidebarCategoryListItem key={index} category={category} />
    ))}
  </CategoryList>
);

export default SidebarCategoryList;
