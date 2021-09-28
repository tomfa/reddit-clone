import { connect } from 'react-redux';
import GoogleLoginComponent from './Component';
import { googleLoginError, googleLoginSuccess } from '../../actions/auth';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';

const mapStateToProps = state => ({ loading: state.auth.loading });
const mapDispatchToProps = { googleLoginSuccess, googleLoginError };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);


const GoogleLoginContainer = enhance(GoogleLoginComponent);

export default GoogleLoginContainer;
