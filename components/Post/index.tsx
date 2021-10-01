import React from "react";
import styled from "styled-components";
import PostVoteContainer from "./Vote/Component";
import PostContent from "./Content";
import {Post} from "../../graphql/generated/types";

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${(props) => props.theme.foreground};
`;

const PostContainer = ({ id, votes, score, comments, full, ...content }: Post) => (
  <Wrapper>
    <PostVoteContainer id={id} votes={votes} score={score} />
    <PostContent
      showFullPost={full}
      id={id}
      commentCount={comments ? comments.length : 0}
      {...content}
    />
  </Wrapper>
);

export default PostContainer;
