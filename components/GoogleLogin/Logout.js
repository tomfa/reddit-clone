import React from 'react';
import { GoogleLogout } from 'react-google-login';
import config from '../../config/config';

const clientId = config.access.google.clientId;

export default function Logout() {
  const onSuccess = res => console.log(res);

  return (
    <GoogleLogout
      clientId={clientId}
      buttonText={'Log out'}
      onLogoutSuccess={onSuccess}
      style={{ marginTop: '100px' }}
    />
  );
}
