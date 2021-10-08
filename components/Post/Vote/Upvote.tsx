import styled from "styled-components";
import PostVoteButton from "./Button";

const PostVoteUpvote = styled(PostVoteButton)<{ hasVoted: boolean }>`
  padding-top: 0.5rem;

  --iconColor: ${(props) =>
    props.hasVoted ? "var(--color-blue)" : "var(--color-vote)"};

  ::after {
    border-top: 2px solid var(--iconColor);
    border-right: 2px solid var(--iconColor);
    top: 3px;
  }
`;

export default PostVoteUpvote;
