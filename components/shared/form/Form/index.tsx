import React from "react";
import styled from "styled-components";
import { transition } from "../../helpers";
import FormWrapper from "./Wrapper";
import LoadingIndicatorSpinner from "../../LoadingIndicator/Spinner";

const StyledForm = styled.form<{ loading?: boolean }>`
  ${transition("filter")};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${(props) =>
    props.loading &&
    "filter: grayscale(0.5) blur(5px) opacity(0.6); pointer-events: none"};
`;

type Props = {
  wide?: boolean;
  className?: string;
  loading?: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};
const Form: React.FC<Props> = ({ className, wide, loading, ...props }) => (
  <FormWrapper className={className} wide={wide}>
    <StyledForm {...props} />
    {loading && <LoadingIndicatorSpinner />}
  </FormWrapper>
);

export default Form;
