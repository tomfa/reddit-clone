import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "../shared/Button";
import { ROUTES } from "../../utils/routes.utils";

const CreatePostButton = styled(Button)`
  border-radius: 2px 2px 0 0;
  padding: 16px;
  text-decoration: none;
  text-align: center;
`;

const SidebarCreatePostButton = () => (
  <Link href={ROUTES.ADD_POST()} passHref={true}>
    <CreatePostButton as={"a"}>create post</CreatePostButton>
  </Link>
);

export default SidebarCreatePostButton;
