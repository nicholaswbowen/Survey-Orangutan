const route = function route($stateProvider) {
  $stateProvider
    .state('viewSurvey', {
      parent: 'main',
      url: '/viewSurvey/:surveyId',
      template: '<view-survey></view-survey>'
    });
};

route.$inject = ['$stateProvider'];

export default route;
