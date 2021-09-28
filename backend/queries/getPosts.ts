import {EmptyResolverArgs, UserAuth} from "../../request.types";
import {Post, PostType} from "../../graphql/generated/types";

export const getPosts = async (args: EmptyResolverArgs, session: UserAuth): Post[] => [
  {
    title: "Test title",
    content: "https://vg.no",
    author: { id: "aosdkaosdkpasd" },
    category: "TestCategory",
    score: 0,
    votes: [],
    comments: [],
    created: Date.now(),
    views: 1,
    type: PostType.Link,
    slug: 'test-title'
  },
];
