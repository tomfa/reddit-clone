import React from "react";
import styled from "styled-components";
import moment from "moment";
import  Link from "next/link";
import { link } from "../../shared/helpers";
import StyledLink from "../../shared/StyledLinkComponent";
import {Post} from "../../../graphql/generated/types";

const Wrapper = styled.div`
  font-size: 13px;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > * {
    margin-right: 4px;
  }

  & > a {
    ${link};
  }

  & > span {
    color: var(--color-mutedText);
  }
`;

const PostContentDetail = ({post}: {post: Post} ) => {
  return (
    <Wrapper>
      <Link href={`/a/${post.category}/${post.slug}`} passHref>
        <a>{post.comments.length} comment{post.comments.length !== 1 ? "s" : null}</a>
      </Link>
      <StyledLink href={`/a/${post.category}`}
                  passHref><a>/a/{post.category}</a></StyledLink>
      <span>by</span>
      <StyledLink
        href={`/u/${post.author.username}`}>{post.author.username}</StyledLink>
      <span>{moment(post.createdAt).fromNow()}</span>
    </Wrapper>
  )
};

export default PostContentDetail;
