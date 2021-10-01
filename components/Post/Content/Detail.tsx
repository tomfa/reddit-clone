import React from "react";
import styled from "styled-components";
import moment from "moment";
import  Link from "next/link";
import { link } from "../../shared/helpers";
import Author from "../../shared/Author";
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

const PostContentDetail = ({post}: {post: Post} ) => (
  <Wrapper>
    <Link href={`/a/${post.category}/${post.id}`}>
      <span>{post.comments.length} comment{post.comments.length !== 1 ? "s" : null}</span>
    </Link>
    <Link href={`/a/${post.category}`}><span>/a/{post.category}</span></Link>
    <span>by</span>
    <Author username={post.author && post.author.username} />
    <span>{moment(post.createdAt).fromNow()}</span>
  </Wrapper>
);

export default PostContentDetail;
