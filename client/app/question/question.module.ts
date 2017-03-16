import * as angular from 'angular';
import controller from './question.controller';

const name = 'question';
const template = '/client/app/question/question.html';

export default angular.module('app.question', [])
  .component(name, {
    templateUrl: template,
    bindings: {type: '<'},
    controller,
    controllerAs: 'vm'
  })
  .name;
