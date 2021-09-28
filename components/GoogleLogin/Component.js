import React from 'react';
import Form from '../shared/form/Form';
import Login from './Login';
import Logout from './Logout';

export default function GoogleLoginComponent({
  loading,
  user,
  token,
  googleLoginSuccess,
  googleLoginError,
  history
}) {
  const onSuccess = ({ profileObj, tokenId }) => {
    googleLoginSuccess({ user: profileObj, token: tokenId });
    history.push('/');
  };
  return (
    <Form loading={loading} wide>
      {!user && (
        <Login token={token} onSuccess={onSuccess} onError={googleLoginError} />
      )}
      {user && <Logout />}
    </Form>
  );
}
