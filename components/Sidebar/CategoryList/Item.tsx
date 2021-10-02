import React from "react";
import styled from "styled-components";
import NavLink from "../../shared/NavLink";

const Item = styled(NavLink)`
  display: block;
  padding: 12px;
  font-size: 15px;
  text-decoration: none;
  color: var(--color-normalText);

  ::after {
    left: -1px;
    top: 0;
    bottom: 0;
    border-left: 3px solid var(--color-blue);
  }
`;

const SidebarCategoryListItem = ({ category }: { category: string }) => {
  const isAll = category === "all";
  return <Item href={isAll ? "/" : `/a/${category}`}>{category}</Item>;
};

export default SidebarCategoryListItem;
