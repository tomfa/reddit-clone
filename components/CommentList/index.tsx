import React from "react";
import styled from "styled-components";
import CommentListItem from "./Item";
import {Comment} from "../../graphql/generated/types";

const List = styled.ul`
  margin-top: 16px;
  list-style: none;
`;

const mapComments = (comments: Comment[]) =>
  comments.map((comment, index) => (
    <CommentListItem key={index} {...comment} />
  ));

const sortComments = (comments: Comment[]) =>
  comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const CommentList = ({ comments }: { comments: Comment[]}) =>
  comments && <List>{mapComments(sortComments(comments))}</List>;

export default CommentList;
