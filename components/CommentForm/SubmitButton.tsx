import React from "react";
import styled from "styled-components";
import SubmitButton from "../shared/form/SubmitButton";

const StyledSubmitButton = styled(SubmitButton)`
  margin: 4px;
  padding: 4px 12px;
`;

const CommentFormSubmitButton = ({ loading }: { loading: boolean }) => (
  <StyledSubmitButton type="submit" disabled={loading}>
    {(loading && "...") || "submit"}
  </StyledSubmitButton>
);

export default CommentFormSubmitButton;
