import * as angular from 'angular';

// MAINTAIN ALPHABETICALLY
export default angular.module('app.core.constants', [])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('HOME_CONFIG', {
    title: 'Home Page'
  })
  .name;
