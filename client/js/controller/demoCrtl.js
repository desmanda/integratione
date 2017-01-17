'use strict';
app.controller('demoCrtl', function ($scope, myService, $http, $location, $window) {

    $scope.full = false;
    $scope.part= true;
    
 /*   $scope.userquery = $location.search()['query'];

    $http({
        method: 'GET',
        url: '/infex-rich-client/mock/mock-client?subject=' + $scope.userquery
    }).success(function (data, status, headers, config) {
        $scope.extractions = data;
        $scope.loading = false;
        console.log($scope.extractions);
    }).error(function (data, status, headers, config) {
        console.log(status);
        alert("failure");
    });

    $scope.$on('$locationChangeStart', function () {

        $scope.userquery = $location.search()['query'];

        $http({
            method: 'GET',
            url: '/infex-rich-client/mock/mock-client?subject=' + $scope.userquery
        }).success(function (data, status, headers, config) {
            $scope.extractions = data;
            $scope.loading = true;
            console.log($scope.extractions);
        }).error(function (data, status, headers, config) {
            console.log(status);
            alert("failure");
        });

    });
    */
});

app.directive('graphChart', function ($window) {
    return {
      restrict: 'E',
      scope: {},
      link: function (scope, element, attrs){
        var margin = parseInt(attrs.margin) || 20; 
          window.onresize = function() {
            scope.$apply();
          };
           scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render();
          });
      var width = d3.select(element[0]).node().parentNode.offsetWidth-margin;
        var width1 = $window.innerWidth;
          console.log(width);
      var height = $window.innerHeight;
       var graph = {
  "nodes":[
		{"name":"node1","group":1},
		{"name":"node2","group":2},
		{"name":"node3","group":2},
		{"name":"node4","group":3}
	],
	"links":[
		{"source":2,"target":1,"weight":1},
		{"source":0,"target":2,"weight":3}
	]
};
          var svg = d3.select(element[0]).append("svg")
                  .style('width', width).
          style('background', "blue").
                style('height', height);
          ;
          /*.attr("height", height);*/
          
        var force = d3.layout.force()
    .gravity(.05)
    .distance(50)
    .charge(-100)
    .size([width, height]);
          force.nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);
          // node is a css class basically the game is here load different data graph.adjectives here and assigned to a different class bu the //link keep them similar 
  node.append("circle")
      .attr("r","5");

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
      });
      scope.render = function() {
    // remove all previous items before render
    svg.selectAll('*').remove();
    var width = d3.select(element[0]).node().parentNode.offsetWidth-margin,
    svg.attr('height', height);
    svg.selectAll('rect')        
        .attr('fill', function(d) { return color(d.score); })
        .transition()
          .duration(1000)
          .attr('width', function(d) {
            return xScale(d.score);
          });  
           }}});







    
 
      
      
