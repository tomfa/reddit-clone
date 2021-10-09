import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { link, overflow } from "../../shared/helpers";
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

const getPostLink = ({ post, full }: Props) => {
  if (post.type === PostType.Link) {
    if (post.content.startsWith("http")) {
      return post.content;
    }
    return `https://${post.content}`;
  }
  if (!full) {
    return ROUTES.POST(post);
  }
};

const getPostTitle = (post: Post) => {
  if (!post.archived) {
    return post.title;
  }
  return post.title + " (archived)";
};

type Props = { post: Post; full: boolean };
const PostContentTitle = ({ post, full }: Props) => {
  const href = getPostLink({ post, full });
  const title = getPostTitle(post);
  return (
    <Wrapper full={full} archived={post.archived}>
      {href && <Link href={href}>{title}</Link>}
      {!href && <span>{title}</span>}
    </Wrapper>
  );
};

export default PostContentTitle;
