import React from "react";
import styled from "styled-components";
import NavLink from "../../shared/NavLink";
import { ROUTES } from "../../../utils/routes.utils";

const Item = styled(NavLink)<{ active: boolean }>`
  display: block;
  padding: 12px;
  font-size: 15px;
  text-decoration: none;
  color: ${(p) => (p.active ? "var(--color-blue)" : "var(--color-text)")};

  ::after {
    left: -1px;
    top: 0;
    bottom: 0;
    border-left: 3px solid var(--color-blue);
  }
`;

const SidebarCategoryListItem = ({
  category,
  active,
}: {
  category: string;
  active: boolean;
}) => {
  const isAll = category === "all";
  const url = isAll ? ROUTES.HOME() : ROUTES.CATEGORY(category);
  return (
    <Item href={url} active={active}>
      {category}
    </Item>
  );
};

export default SidebarCategoryListItem;
