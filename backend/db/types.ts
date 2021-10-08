import { Comment, Post, User, UserVote } from "../../graphql/generated/types";

export type DBVote = UserVote;
export type DBPost = Post;
export type DBUser = User & {
  authId: string;
  email: string;
  createdAt: FirebaseFirestore.FieldValue;
};
export type DBComment = Comment;
