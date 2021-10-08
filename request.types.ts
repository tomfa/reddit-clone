import { IncomingHttpHeaders } from "http";
import { User } from "./graphql/generated/types";

export type RequestContext = {
  auth: UserAuth | null;
  headers: IncomingHttpHeaders;
  // eslint-disable-next-line no-undef
  config: NodeJS.ProcessEnv;
};

export type UserAuth = Omit<User, "createdAt">;

export type EmptyResolverArgs = Record<never, never>;
