import { IncomingHttpHeaders } from "http";

export type RequestContext = {
  auth: UserAuth;
  headers: IncomingHttpHeaders;
  // eslint-disable-next-line no-undef
  config: NodeJS.ProcessEnv;
};

export type UserAuth = null | {
  name?: string | null;
  email: string;
  image?: string | null;
};

export type EmptyResolverArgs = Record<never, never>;
