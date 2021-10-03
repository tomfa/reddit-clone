import styled from "styled-components";
import PostVoteButton from "./Button";

const PostVoteDownvote = styled(PostVoteButton)<{ hasVoted: boolean }>`
  ::after {
    border-bottom: 2px solid
      ${(props) => (props.hasVoted ? "var(--color-blue)" : "var(--color-vote)")};
    border-left: 2px solid
      ${(props) => (props.hasVoted ? "var(--color-blue)" : "var(--color-vote)")};
    top: -2px;
  }
`;

export default PostVoteDownvote;
