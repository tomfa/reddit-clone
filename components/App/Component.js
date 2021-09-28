import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import theme from '../../theme';
import history from '../../util/history';
import GlobalStyle from '../../globalStyle';
import HeaderContainer from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';
import LoginFormContainer from '../LoginForm/Container';
import SignupFormContainer from '../SignupForm/Container';
import CreatePostFormContainer from '../CreatePostForm/Container';
import Home from '../Home';
import config from '../../config/config';
import GoogleLoginContainer from '../GoogleLogin/Container';

const App = props => {
  const useGoogleLogin = !!config.access.google.clientId;
  return (
    <ThemeProvider theme={theme(props.dark)}>
      <Router history={history}>
        <>
          <GlobalStyle />
          <Route component={HeaderContainer} />
          <Route component={ErrorNotificationContainer} />
          <Switch>
            <Route
              path='/login'
              component={
                useGoogleLogin ? GoogleLoginContainer : LoginFormContainer
              }
            />
            <Route
              path='/signup'
              component={
                useGoogleLogin ? GoogleLoginContainer : SignupFormContainer
              }
            />
            <Route path='/createpost' component={CreatePostFormContainer} />
            <Route path='/' component={Home} />
          </Switch>
        </>
      </Router>
    </ThemeProvider>
  );
};

export default App;
