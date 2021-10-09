import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
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
];

const Markdown = ({ children }: { children: string }) => (
  <StyledReactMarkdown
    plugins={[breaks]}
    allowedElements={allowed}
    components={renderers}
    unwrapDisallowed
  >
    {children}
  </StyledReactMarkdown>
);

export default Markdown;
