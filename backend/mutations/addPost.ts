import {MutationAddPostArgs, Post} from "../../graphql/generated/types";
import {slugify} from "../../utils/string.utils";

export const addPost = async (
  { input }: MutationAddPostArgs,
  token: unknown
): Promise<Post> => {
  const slug = slugify(input.title); // TODO: Check for duplicate
  return {
    author: { id: "" },
    category: input.category,
    comments: [],
    content: input.content,
    created: new Date(),
    score: 0,
    slug,
    title: input.title,
    type: input.type,
    views: 0,
    votes: [],
  };
};
