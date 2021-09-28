import React from 'react';
import { GoogleLogin } from 'react-google-login';
import config from '../../config/config';

export default function Login({ onSuccess, token, onError }) {
  return (
    <GoogleLogin
      clientId={config.access.google.clientId}
      buttonText={'Login'}
      onSuccess={res => {
        onSuccess(res);
        refreshTokenSetup(res);
      }}
      onFailure={onError}
      cookiePolicy={'single_host_origin'}
      style={{ marginTop: '100px', width: '100%' }}
      isSignedIn={!!token}
    />
  );
}

const refreshTokenSetup = res => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};
