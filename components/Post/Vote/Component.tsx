import React from "react";
import styled from "styled-components";
import PostVoteUpvote from "./Upvote";
import PostVoteDownvote from "./Downvote";
import {Post, User, UserVote} from "../../../graphql/generated/types";
import {useUserData} from "../../../lib/hooks";
import {useSession} from "next-auth/client";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  padding: 4px;
  font-size: 12px;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color:  var(--color-normalText);
`;


type Props = { post: Post }
const PostVote = ({ post }: Props) => {
  const user = useSession();
  console.log(user)
  const isByUser = post.author.id === user;
  const upvote = () => {}
  const downvote = () => {}

  return (
    <Wrapper>
      <PostVoteUpvote
        canVote={!isByUser}
        didVote={false}
        onClick={upvote}
      />
      <span>{post.score}</span>
      <PostVoteDownvote
        canVote={!isByUser}
        didVote={false}
        onClick={downvote}
      />
    </Wrapper>
  )
}
//
// class PostVote extends React.Component<Props> {
//   constructor(props: Props) {
//     super(props);
//     const didVote = PostVote.existingVote(props);
//     this.state = {
//       score: props.score,
//       didVote,
//       didUpvote: didVote === 1,
//       didDownvote: didVote === -1,
//     };
//   }
//
//   static existingVote({ user, votes }: Props) {
//     const existingVote =
//       user && votes && votes.find((vote) => vote.userId === user.id);
//     return existingVote ? existingVote.vote : 0;
//   }
//
//   componentWillUpdate(nextProps, nextState, nextContext) {
//     if (this.props.score !== nextProps.score) {
//       const didVote = PostVote.existingVote(nextProps);
//       this.setState({
//         score: nextProps.score,
//         didVote,
//         didUpvote: didVote === 1,
//         didDownvote: didVote === -1,
//       });
//     } else if (this.props.token !== nextProps.token && !nextProps.token) {
//       this.setState({
//         didVote: false,
//         didUpvote: false,
//         didDownvote: false,
//       });
//     }
//   }
//
//   castVote(vote) {
//     const { attemptVote, id, token } = this.props;
//     if (token) {
//       attemptVote(id, vote);
//       this.setState({
//         score: this.state.score + vote - this.state.didVote,
//         didVote: vote,
//         didUpvote: vote === 1,
//         didDownvote: vote === -1,
//       });
//     }
//   }
//
//   upvote = () => this.castVote(this.state.didUpvote ? 0 : 1);
//
//   downvote = () => this.castVote(this.state.didDownvote ? 0 : -1);
//
//   render() {
//     return (
//       <Wrapper>
//         <PostVoteUpvote
//           canVote={!!this.props.token}
//           didVote={this.state.didUpvote}
//           onClick={this.upvote}
//         />
//         <span>{this.state.score}</span>
//         <PostVoteDownvote
//           canVote={!this.props.token}
//           didVote={this.state.didDownvote}
//           onClick={this.downvote}
//         />
//       </Wrapper>
//     );
//   }
// }

export default PostVote;
