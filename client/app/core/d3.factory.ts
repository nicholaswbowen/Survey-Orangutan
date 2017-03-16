import * as angular from "angular";
import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import {selection} from '../bundles/d3-selection-multi';
import {line} from 'd3-shape';
export default angular.module('app.d3Factory', [])
  .factory('d3', () => {
    return Object.assign(d3, {scaleLinear, selection, line})})
  .name;
