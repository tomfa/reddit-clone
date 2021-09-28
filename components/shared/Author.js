import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { link } from "./helpers";

const StyledLink = styled(Link)`
  ${link};

  font-weight: 500;
  color: ${(props) => props.theme.normalText};
`;

const Author = ({ username }) => (
  <StyledLink href={`/u/${username}`}>{username || 'undefined'}</StyledLink>
);

export default Author;
