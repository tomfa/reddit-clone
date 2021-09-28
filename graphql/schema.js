const { gql } = require("apollo-server-core");

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
    slug: String!
    content: String!
    author: User!
    category: String!
    score: Int!
    votes: [UserVote!]!
    comments: [Comment!]!
    created: Date!
    views: Int!
    type: PostCategory!
  }


  input AddPostInput {
      title: String!
      content: String!
      category: String!
      type: PostCategory!
  }

  type Query {
    posts: [Post!]!
  }
  
  type Mutation {
      addPost(input: AddPostInput!): Post!
  }
`;

export default typeDefs;
