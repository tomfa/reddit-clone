import React from "react";
import styled from "styled-components";
import moment from "moment";

const Timestamp = styled.span`
  margin-left: 4px;
  color: var(--color-mutedText);
`;

const CommentDetailTimestamp = (props) => (
  <Timestamp>{moment(props.created).fromNow()}</Timestamp>
);

export default CommentDetailTimestamp;
