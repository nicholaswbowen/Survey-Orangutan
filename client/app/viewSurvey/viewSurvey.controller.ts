declare var oboe;
class ViewSurveyController {
  data = [];
  counter = 1;
  constructor(private $scope, private $stateParams, private $http, private d3, private scaleLinear) {
    this.getSurvey();
  }
  public getSurvey(){
    let worker = new Worker('client/app/workers/surveyWorker.js');
    worker.postMessage(this.$stateParams.surveyId);
    worker.addEventListener('message', (e) => {
      this.data.push(...e.data);
      if (this.data.length >= 4000){
        this.$scope.$digest();
        console.log(this.d3);
        this.buildGraph(this.data);
      }
    })
  }
  public buildGraph(ds){
    // key
    // info[0] = age
    // info[1] = sex index
    // info[2] = race index
    const w = 300;
    const h = 500;
    const d3 = this.d3;
    let mostCommonAnswersBySex = new Map();

    ds.forEach((d) => {
      let check = mostCommonAnswersBySex.get(d.info[1]);
      if (check){
        check.push(d.answers[0]);
        mostCommonAnswersBySex.set(d.info[1], check);
      }else{
        mostCommonAnswersBySex.set(d.info[1], []);
      }
    })
    console.log(mostCommonAnswersBySex);
    // x = answers to question 1
    let xScale = d3.scaleLinear()
      .domain([
        d3.min(ds, (d) => d.answers[0]),
        d3.max(ds, (d) => d.answers[0])
      ])
      .range([0, w]);
    // y = age
    let yScale = d3.scaleLinear()
      .domain([
        d3.min(ds, (d) => d.info[0]),
        d3.max(ds, (d) => d.info[0])
      ])
      .range([h, 0]);
      let lineFun = d3.line()
                      .x((d) => xScale(d.answers[0]))
                      .y((d) => yScale(d.info[0]));
      let svg = d3.selection("body")
                  .append("svg")
                  .attrs({
                    height: h,
                    width: w
                  });
      let viz = svg.append("path")
                   .attrs({
                     d: lineFun(ds),
                     "stroke" : "purple",
                     "stroke-width" : 2,
                     "fill" : "none"
                   });

  }
}

ViewSurveyController.$inject = ['$scope','$stateParams', "$http", "d3"];
export default ViewSurveyController;
