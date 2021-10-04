import styled from "styled-components";

const FormWrapper = styled.div<{ wide?: boolean }>`
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  width: 100%;
  border-radius: 2px;
  padding: 24px;
  background-color: var(--color-foreground);

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: ${(props) => (props.wide ? "600px" : "375px")}) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

export default FormWrapper;
