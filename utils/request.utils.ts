import { UserAuth } from "../request.types";
import { JWT } from "next-auth/jwt";
import {
  Comment,
  CommentCursor,
  Post,
  PostCursor,
} from "../graphql/generated/types";

export const toUserAuth = (jwt: JWT): UserAuth => {
  return {
    id: jwt.id,
    username: jwt.username,
    name: jwt.name,
  };
};

export const toCommentCursor = (comment?: Comment): CommentCursor | undefined =>
  comment && {
    createdAt: comment.createdAt,
    id: comment.id,
    postId: comment.post.id,
  };

export const toPostCursor = (post?: Post): PostCursor | undefined =>
  post && {
    createdAt: post.createdAt,
    id: post.id,
    numComments: post.numComments,
    numVotes: post.numVotes,
    score: post.score,
  };
