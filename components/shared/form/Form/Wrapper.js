import styled from "styled-components";

const FormWrapper = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  max-width: ${(props) => (props.wide ? "600px" : "375px")};
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
