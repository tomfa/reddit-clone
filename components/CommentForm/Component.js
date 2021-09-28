import React from "react";
import CommentFormTextArea from "./TextArea";
import CommentFormSubmitButton from "./SubmitButton";
import { StyledForm } from "./StyledForm.styles";
import { Form } from "react-final-form";

class CommentForm extends React.Component {
  createComment = (comment) => this.props.attemptCreateComment(comment);

  onSubmit = () => this.props.handleSubmit(this.createComment);

  render() {
    return (
      <Form>
        {() => (
          <StyledForm onSubmit={this.onSubmit()}>
            <CommentFormTextArea name="comment" onSubmit={this.onSubmit()} />
            <CommentFormSubmitButton />
          </StyledForm>
        )}
      </Form>
    );
  }
}

export default CommentForm;
