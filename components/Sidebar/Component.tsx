import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import SidebarCreatePostButton from "./CreatePostButton";
import SideBarMenu, { SideBarMenuProps } from "./SideBarMenu";
import { useCurrentCategory, useUserData } from "../../lib/hooks";
import { MobileMenuProps } from "../MobileMenu/MobileMenu";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes.utils";
import { config } from "../../lib/config";

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

const Sidebar = (props: Partial<SideBarMenuProps>) => {
  const { isLoggedIn } = useUserData();
  const defaultSelected = ROUTES.CATEGORY(useCurrentCategory() || "all");
  const defaultOptions = useMemo(
    () =>
      ["all", ...config.categories].map((value) => ({
        value: ROUTES.CATEGORY(value),
        label: value,
      })),
    [config.categories]
  );

  return (
    <Wrapper>
      {isLoggedIn && <SidebarCreatePostButton />}
      <SideBarMenu
        selected={props.selected || defaultSelected}
        options={props.options || defaultOptions}
        header={props.header || "categories"}
      />
    </Wrapper>
  );
};

export default Sidebar;
