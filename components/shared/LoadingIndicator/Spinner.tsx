import styled from "styled-components";
import { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const LoadingIndicatorSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  animation: ${spin} 1s infinite linear;
  border: 0.3rem solid var(--color-blue);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  border-left: 3px solid transparent;
  width: 48px;
  height: 48px;
`;

export default LoadingIndicatorSpinner;
