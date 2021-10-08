import styled from "styled-components";
import { transition } from "../../shared/helpers";

const PostVoteButton = styled.button<{ canVote: boolean; hasVoted?: boolean }>`
  ${transition("background-color")};

  padding: 0;
  border: 0;
  border-radius: 3px;
  height: 1.3rem;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: 0;
  }

  ${(p) =>
    p.canVote &&
    `
  :hover {
    background-color: var(--color-voteButtonHover);
  }`}

  ::after {
    ${transition("border")};

    content: "";
    display: block;
    transform: rotate(-45deg);
    width: 8px;
    height: 8px;
  }

  @media (max-width: 768px) {
  }

  ${({ canVote }) =>
    !canVote &&
    `
    cursor: default;
    pointer-events: none;
  `}
`;

export default PostVoteButton;
