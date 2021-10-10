import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import CategoryMenuCreatePostButton from "./CreatePostButton";
import { useCurrentCategory, useUserData } from "../../lib/hooks";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes.utils";
import { config } from "../../lib/config";
import Dropdown from "./Dropdown";

const Menu = styled.nav`
  display: none;
  border: 1px solid var(--color-border);
  border-left: none;
  border-right: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export type MobileMenuProps = {
  options: Array<{ value: string; label: string }>;
  selected: string;
  onSelect: (value: string) => void;
};
const MobileMenu = (props: Partial<MobileMenuProps>) => {
  const { isLoggedIn } = useUserData();
  const router = useRouter();
  const defaultOnSelect = useCallback(
    (category: string) => {
      const url =
        category === "all" ? ROUTES.HOME() : ROUTES.CATEGORY(category);
      router.push(url);
    },
    [router]
  );
  const defaultSelected = useCurrentCategory() || "all";
  const defaultOptions = useMemo(
    () =>
      ["all", ...config.categories].map((value) => ({ value, label: value })),
    []
  );

  return (
    <Menu>
      <Dropdown
        value={props.selected || defaultSelected}
        options={props.options || defaultOptions}
        onValueChange={props.onSelect || defaultOnSelect}
      />
      {isLoggedIn && <CategoryMenuCreatePostButton />}
    </Menu>
  );
};

export default MobileMenu;
