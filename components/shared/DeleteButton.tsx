import React from "react";
import styled from "styled-components";
import { link } from "./helpers";

const Button = styled.button`
  ${link};

  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 13px;
  color:  var(--color-normalText);
  margin-left: auto;
`;

type Props = { onClick: () => void, label: string }
const DeleteButton = ({ onClick, label = 'archive'}: Props) => <Button onClick={onClick}>{label}</Button>;

export default DeleteButton;
