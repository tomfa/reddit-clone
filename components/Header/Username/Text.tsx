import styled from "styled-components";
import { wideFont } from "../../shared/helpers";

const HeaderUsernameText = styled.span`
  ${wideFont};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-mutedText);
`;

export default HeaderUsernameText;
