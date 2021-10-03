import React from "react";
import styled from "styled-components";
import StyledLinkComponent from "../../shared/StyledLinkComponent";
import CommentDetailTimestamp from "./Timestamp";
import DeleteButton from "../../shared/DeleteButton";
import { Comment } from "../../../graphql/generated/types";
import StyledLink from "../../shared/StyledLinkComponent";
import { useUserData } from "../../../lib/hooks";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
  padding: 8px;
  font-size: 13px;
`;

const CommentDetail = ({ comment }: { comment: Comment }) => {
  return (
    <Wrapper>
      <StyledLink href={`/u/${comment.author.username}`}>
        {comment.author.username}
      </StyledLink>
      <CommentDetailTimestamp created={comment.createdAt} />
    </Wrapper>
  );
};

export default CommentDetail;
