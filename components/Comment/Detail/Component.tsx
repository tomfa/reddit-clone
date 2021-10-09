import React from "react";
import styled from "styled-components";
import CommentDetailTimestamp from "./Timestamp";
import { Comment } from "../../../graphql/generated/types";
import StyledLink from "../../shared/StyledLinkComponent";
import { ROUTES } from "../../../utils/routes.utils";
import style from "../../../styles/utils.module.css";

const Wrapper = styled.div`
  border-bottom: 1px solid var(--color-border);
  padding: 8px;
  font-size: 13px;
`;

type Props = {
  comment: Comment;
  displayPostInfo: boolean;
};
const CommentDetail = ({ comment, displayPostInfo }: Props) => {
  return (
    <Wrapper>
      <StyledLink href={ROUTES.USER(comment.author)}>
        {comment.author.username}
      </StyledLink>

      {displayPostInfo && (
        <>
          <span className={style.mutedText}> on </span>
          <StyledLink href={ROUTES.POST_REDIRECT(comment.post)}>
            {comment.post.title}
          </StyledLink>
        </>
      )}
      <CommentDetailTimestamp created={comment.createdAt} />
    </Wrapper>
  );
};

export default CommentDetail;
