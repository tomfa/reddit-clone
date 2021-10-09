import React from "react";
import styled from "styled-components";
import NavLink from "../../shared/NavLink";
import { ROUTES } from "../../../utils/routes.utils";

const LinkComponent = styled(NavLink)<{ active: boolean }>`
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

const SideBarListItem = ({
  url,
  label,
  active,
}: {
  url: string;
  label: string;
  active: boolean;
}) => {
  return (
    <LinkComponent href={url} active={active}>
      {label}
    </LinkComponent>
  );
};

export default SideBarListItem;
