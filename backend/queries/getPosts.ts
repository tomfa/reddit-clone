import {EmptyResolverArgs, UserAuth} from "../../request.types";

export const getPosts = async (args: EmptyResolverArgs, session: UserAuth) => [
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
];
