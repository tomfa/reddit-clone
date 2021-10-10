import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import gfm from "remark-gfm";
import renderers from "./renderers";

const StyledReactMarkdown = styled(ReactMarkdown)`
  color: var(--color-text);
  font-size: 15px;
  line-height: 1.5;

  p,
  ol,
  ul,
  pre,
  table {
    margin-bottom: 0.5em;
  }

  ol,
  ul {
    padding-left: 1.2rem;
  }

  table {
    border: 1px solid black;
  }
  td,
  th {
    padding: 0 0.3rem;
    border-left: 1px solid black;
  }
  tr {
    border-bottom: 1px solid black;
  }
  h1 {
    font-size: 1.5rem;
  }
  h2,
  h3,
  h4,
  h5 {
    font-size: 1rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-left: 0;
    margin-right: 0;
  }

  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
    font-size: 14px;
    line-height: 1.25;
  }

  > :last-child {
    margin-bottom: 0;
  }

  > :first-child {
    margin-top: 0;
  }
`;

const allowed = [
  "p",
  "em",
  "br",
  "strong",
  "span",
  "strong",
  "delete",
  "a",
  "code",
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th",
  "hr",
  "ul",
  "ol",
  "li",
  "inlineCode",
  "h1",
  "h2",
  "h3",
  "del",
];

const Markdown = ({ children }: { children: string }) => (
  <StyledReactMarkdown
    allowedElements={allowed}
    plugins={[breaks, gfm]}
    components={renderers}
    unwrapDisallowed
  >
    {children}
  </StyledReactMarkdown>
);

export default Markdown;
