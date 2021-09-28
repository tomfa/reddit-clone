import React from "react";
import styled from "styled-components";
import moment from "moment";
import  Link from "next/link";
import { link } from "../../shared/helpers";
import Author from "../../shared/Author";

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
    color: ${(props) => props.theme.mutedText};
  }
`;

const PostContentDetail = (props) => (
  <Wrapper>
    <Link href={`/a/${props.category}/${props.id}`}>
      <span>{props.commentCount} comment{props.commentCount !== 1 ? "s" : null}</span>
    </Link>
    <Link href={`/a/${props.category}`}><span>/a/{props.category}</span></Link>
    <span>by</span>
    <Author username={props.author && props.author.username} />
    <span>{moment(props.created).fromNow()}</span>
  </Wrapper>
);

export default PostContentDetail;
