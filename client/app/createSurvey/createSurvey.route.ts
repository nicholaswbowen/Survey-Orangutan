const route = function route($stateProvider) {
  $stateProvider
    .state('createSurvey', {
      parent: 'main',
      url: '/createSurvey',
      template: '<create-survey></create-survey>'
    });
};

route.$inject = ['$stateProvider'];

export default route;
