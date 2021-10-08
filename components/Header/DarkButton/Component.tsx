import React from "react";
import styled from "styled-components";
import { headerItem } from "../../shared/helpers";
import HeaderDarkButtonIcon from "./Icon";

const DarkButton = styled.span`
  ${headerItem};

  padding: 0 8px;
  cursor: pointer;

  @media (hover: hover) {
    :hover path {
      fill: var(--color-blue);
    }
  }
`;

const HeaderDarkButton = () => {
  return (
    <DarkButton onClick={() => console.log("TODO: implement theme")}>
      <HeaderDarkButtonIcon />
    </DarkButton>
  );
};

export default HeaderDarkButton;
