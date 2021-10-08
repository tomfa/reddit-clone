import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { overflow, link } from "../../shared/helpers";
import { Post, PostType } from "../../../graphql/generated/types";
import { ROUTES } from "../../../utils/routes.utils";

const Wrapper = styled.div<{ full: boolean; archived: boolean }>`
  display: flex;

  * {
    ${overflow};

    display: block;
    font-size: 15px;
    line-height: 21px;
    font-weight: 500;
    text-decoration: none;
    color: var(--color-text);
    ${(props) => props.full && "white-space: unset"};
    ${(props) => props.archived && "text-decoration: line-through;"};
  }

  a,
  a:hover {
    ${link({ underline: true })};
    ${(props) => props.archived && "text-decoration: line-through;"};
  }
`;

const renderTitle = ({ post, full }: Props) => {
  switch (post.type) {
    case "LINK":
      return <a href={post.content}>{post.title}</a>;

    case "TEXT":
      if (full) return <span>{post.title}</span>;
      return <Link href={ROUTES.POST(post)}>{post.title}</Link>;

    default:
      break;
  }
};

type Props = { post: Post; full: boolean };
const PostContentTitle = (props: Props) => {
  return (
    <Wrapper full={props.full} archived={props.post.archived}>
      {renderTitle(props)}
    </Wrapper>
  );
};

export default PostContentTitle;
