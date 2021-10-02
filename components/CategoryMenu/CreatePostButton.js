import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "../shared/Button";

const CreatePostButton = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 0;
  padding: 0 16px;
  text-decoration: none;
`;

const CategoryMenuCreatePostButton = () => (
  <Link href={"/posts/create"} passHref>
    <CreatePostButton as={'a'}>create post</CreatePostButton>
  </Link>
);

export default CategoryMenuCreatePostButton;
