import { Comment, Post, User } from "../../graphql/generated/types";

export type DBPost = Post;
export type DBUser = User & { authId: string, email: string, createdAt: FirebaseFirestore.FieldValue };
export type DBComment = Comment;
