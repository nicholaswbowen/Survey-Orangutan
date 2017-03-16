import * as angular from 'angular';
import route from './viewSurvey.route';
import controller from './viewSurvey.controller';

const name = 'viewSurvey';
const template = '/client/app/viewSurvey/viewSurvey.html';

export default angular.module('app.viewSurvey', [])
  .component(name, {
    templateUrl: template,
    controller,
    controllerAs: 'vm'
  })
  .config(route)
  .name;
