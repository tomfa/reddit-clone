import { gql } from "apollo-server-core";

const typeDefs = gql`
  scalar Date

  enum PostCategory {
    LINK
    TEXT
  }

  type User {
    id: String!
  }

  type UserVote {
    userId: String!
    vote: Int!
    id: String!
  }

  type Comment {
    author: User!
    body: String!
    created: Date!
  }

  type Post {
    title: String!
    url: String
    author: User!
    category: String!
    score: Int!
    votes: [UserVote!]!
    comments: [Comment!]!
    created: Date
    views: Int!
    type: PostCategory!
    text: String
  }

  type Query {
    posts: [Post!]!
  }
`;

export default typeDefs;
