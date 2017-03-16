import * as angular from 'angular';
import route from './createSurvey.route';
import controller from './createSurvey.controller';

const name = 'createSurvey';
const template = '/client/app/createSurvey/createSurvey.html';

export default angular.module('app.createSurvey', [])
  .component(name, {
    templateUrl: template,
    controller,
    controllerAs: 'vm'
  })
  .config(route)
  .name;
