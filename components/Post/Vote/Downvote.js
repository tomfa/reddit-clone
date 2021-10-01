import styled from "styled-components";
import PostVoteButton from "./Button";

const PostVoteDownvote = styled(PostVoteButton)`
  --iconColor: ${(props) =>
    props.didVote ? 'var(--color-downvote)' : 'var(--color-vote)'};

  ::after {
    border-bottom: 2px solid var(--iconColor);
    border-left: 2px solid var(--iconColor);
    top: -2px;
  }
`;

export default PostVoteDownvote;
