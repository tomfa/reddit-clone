import React from "react";
import styled from "styled-components";
import Form from "../shared/form/Form";
import { transition } from "../shared/helpers";
import CommentFormTextArea from "./TextArea";
import CommentFormSubmitButton from "./SubmitButton";

export const StyledForm = styled(Form)`
  ${transition("border", "box-shadow")};

  margin-top: -1px;
  border: 1px solid var(--color-border);
  border-radius: 0 0 2px 2px;
  max-width: none;
  padding: 0;

  @media (hover: hover) {
    :hover {
      border: 1px solid var(--color-blue);
    }
  }

  :focus-within {
    border: 1px solid var(--color-blue);
    box-shadow: 0 0 0 2px  var(--color-blue)4d;
  }

  @media (max-width: 768px) {
    margin-top: -1px;
    border-radius: 0;
    border-left: none;
    border-right: none;

    :hover,
    :focus-within {
      border-left: none;
      border-right: none;
    }
  }
`;
