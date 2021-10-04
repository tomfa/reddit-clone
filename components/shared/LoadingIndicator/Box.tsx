import React from "react";
import styled from "styled-components";
import LoadingIndicatorSpinner from "./Spinner";

const Box = styled.div`
  position: relative;
  margin: 48px auto 48px;
  width: 72px;
  height: 72px;
  background-color: var(--color-foreground);
`;

const LoadingIndicatorBox = () => (
  <Box>
    <LoadingIndicatorSpinner />
  </Box>
);

export default LoadingIndicatorBox;
