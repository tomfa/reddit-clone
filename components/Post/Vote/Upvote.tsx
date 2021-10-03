import styled from "styled-components";
import PostVoteButton from "./Button";

const PostVoteUpvote = styled(PostVoteButton)<{ didVote: boolean }>`
  --iconColor: ${(props) =>
    props.didVote ? 'var(--color-upvote)' : 'var(--color-vote)'};

  ::after {
    border-top: 2px solid var(--iconColor);
    border-right: 2px solid var(--iconColor);
    top: 3px;
  }
`;

export default PostVoteUpvote;
