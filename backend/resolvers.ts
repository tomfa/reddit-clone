import { dateScalar } from "../graphql/date.scalar";

export const resolvers = {
  Query: {
    posts: () => [
      {
        title: "Test title",
        url: "https://vg.no",
        author: { id: "aosdkaosdkpasd" },
        category: "TestCategory",
        score: 0,
        votes: [],
        comments: [],
        created: Date.now(),
        views: 1,
        type: "LINK",
        text: null,
      },
    ],
  },
};
