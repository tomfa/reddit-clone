import React from "react";
import styled from "styled-components";
import SideBarListItem from "./SideBarListItem";
import SideBarListHeader from "./Header";
import { useRouter } from "next/router";

const SideBarListWrapper = styled.nav`
  display: flex;
  flex-direction: column;
`;

export type SideBarMenuProps = {
  options: Array<{ value: string; label: string }>;
  selected: string;
  header: string;
};
const SideBarMenu = ({ selected, options, header }: SideBarMenuProps) => {
  return (
    <SideBarListWrapper>
      <SideBarListHeader>{header}</SideBarListHeader>
      {options.map(({ value, label }) => (
        <SideBarListItem
          key={value}
          active={selected == value}
          url={value}
          label={label}
        />
      ))}
    </SideBarListWrapper>
  );
};

export default SideBarMenu;
