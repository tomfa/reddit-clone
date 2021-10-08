import React from "react";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import { link } from "../../shared/helpers";
import StyledLink from "../../shared/StyledLinkComponent";
import { Post } from "../../../graphql/generated/types";
import { ROUTES } from "../../../utils/routes.utils";

const Wrapper = styled.div`
  font-size: 13px;
  margin-top: auto;
  display: block;
  overflow: hidden;
  width: 100%;

  & > * {
    display: inline-block;
    margin-right: 4px;
  }

  & > a {
    ${link};
  }

  & > span {
    color: var(--color-mutedText);
  }
`;

const PostContentDetail = ({ post }: { post: Post }) => {
  return (
    <Wrapper>
      <Link href={ROUTES.POST(post)} passHref>
        <a>
          {post.numComments} comment
          {post.numComments !== 1 ? "s" : null}
        </a>
      </Link>
      <span>in</span>
      <StyledLink href={ROUTES.CATEGORY(post.category)} passHref>
        <a>/a/{post.category}</a>
      </StyledLink>
      <span>by</span>
      <StyledLink href={ROUTES.USER(post.author)}>
        {post.author.username}
      </StyledLink>
      <span>{moment(post.createdAt).fromNow()}</span>
    </Wrapper>
  );
};

export default PostContentDetail;
