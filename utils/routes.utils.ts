import { Post, User } from "../graphql/generated/types";

export const ROUTES = {
  HOME: () => "/",
  POST: (post: Post) => `/a/${post.category}/${post.id}/${post.slug}`,
  CATEGORY: (category: string) => `/a/${category}`,
  USER: (user: Pick<User, "username">) => `/u/${user.username}`,
  LOGIN: () => `/login`,
  LOGOUT: () => `/logout`,
  ADD_POST: () => `/posts/create`,
};
