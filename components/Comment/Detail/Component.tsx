import React from "react";
import styled from "styled-components";
import StyledLinkComponent from "../../shared/StyledLinkComponent";
import CommentDetailTimestamp from "./Timestamp";
import DeleteButton from "../../shared/DeleteButton";
import { Comment } from "../../../graphql/generated/types";
import StyledLink from "../../shared/StyledLinkComponent";
import { useUserData } from "../../../lib/hooks";
import {ROUTES} from "../../../utils/routes.utils";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
  padding: 8px;
  font-size: 13px;
`;

const CommentDetail = ({ comment }: { comment: Comment }) => {
  return (
    <Wrapper>
      <StyledLink href={ROUTES.USER(comment.author)}>
        {comment.author.username}
      </StyledLink>
      <CommentDetailTimestamp created={comment.createdAt} />
    </Wrapper>
  );
};

export default CommentDetail;
