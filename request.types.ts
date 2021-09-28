import { IncomingHttpHeaders } from 'http';

export type RequestContext = {
  headers: IncomingHttpHeaders;
  // eslint-disable-next-line no-undef
  config: NodeJS.ProcessEnv;
};

export type EmptyResolverArgs = Record<never, never>;
