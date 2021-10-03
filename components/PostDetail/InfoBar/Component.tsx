import React from "react";
import styled from "styled-components";
import DeleteButton from "../../shared/DeleteButton";
import { useUserData } from "../../../lib/hooks";
import { User } from "../../../graphql/generated/types";

const Wrapper = styled.div<{ round?: boolean }>`
  display: flex;
  margin-top: -1px;
  border: 1px solid var(--color-border);
  ${(props) => props.round && "border-radius: 0 0 2px 2px"};
  padding: 8px;
  background-color: var(--color-foreground);
  font-size: 13px;
  color: var(--color-mutedText);

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`;

type Props = {
  slug: string;
  numViews: number;
  upvotePercentage: number;
  author: User;
};
const PostDetailInfoBar = (props: Props) => {
  const { user, isLoggedIn } = useUserData();
  const canDelete = user?.id === props.author.id;
  const deletePost = () => console.log(`Delete not implemented`);
  return (
    <Wrapper round={!isLoggedIn}>
      <span>{props.numViews} views</span>
      <span>&nbsp;|&nbsp;</span>
      <span>{props.upvotePercentage.toFixed(0)}% upvoted</span>
      {canDelete && (
        <DeleteButton onClick={deletePost} />
      )}
    </Wrapper>
  );
};

export default PostDetailInfoBar;
