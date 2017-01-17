'use strict';
app.controller('test', function ($scope, myService, $http, $location, $window,$uibModal) {
    $scope.bookName = "Pride and Prejudice"
    $scope.full = false;
    $scope.part= true;
    
    // modal for book description 
    $scope.open2 = function(){
    var modalInstance = $uibModal.open({
templateUrl: 'book.html',
controller: 'bookCrtl',
       
    })};
    // modal for changing the book 
     $scope.open = function(){
    var modalInstance = $uibModal.open({
templateUrl: 'changebook.html',
controller: 'changebookCrtl',
resolve : {
         book : function (){
            return $scope.bookName;
    }
        }
    })};
    
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
app.controller('changebookCrtl', function($uibModalInstance,$scope,$window,book){
    /* it works here */
    console.log(book);
    /* it works in the template */
    $scope.book = book;
    $scope.ok = function(){
     $uibModalInstance.close();
    };
    $scope.cancel = function()
    {
    $uibModalInstance.dismiss();
    };

});

app.controller('bookCrtl', function($uibModalInstance,$scope,$window){
    $scope.books = ["pride and prejudice", "Hamlet", "Emma", "sense and sensibility"];
    
    $scope.ok= function()
    {
     $uibModalInstance.close();
        /* send the data to another controller to pass it to the rest part !!*/
        console.log($scope.selected); 
    };
    $scope.cancel = function(){
    $uibModalInstance.dismiss();
    };

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
          // define new variables 
      var width = d3.select(element[0]).node().parentNode.offsetWidth-margin;
      var height = $window.innerHeight;
          var svg = d3.select(element[0]).append("svg")
                  .style('width', width).
          style('background', '#D3E9BA').
                style('height', height);
          ;
        
          // render function 
      scope.render = function() {
    // remove all previous items before render
     d3.select("svg").remove();
    var width = d3.select(element[0]).node().parentNode.offsetWidth-margin,
          height = $window.innerHeight;
       var graph = {
  "nodes":[ // add size also !!
        {"name":"Root","group":1,"type":"circle","color":"#F6F7F2","size":20},
		{"name":"Adjective1","group":2,"type":"circle","color":"#414040","size":2},
		{"name":"adj2","group":2,"type":"circle","color":"#414040","size":10},
		{"name":"adj3","group":2,"type":"circle","color":"#414040","size":10},
        {"name":"adj4","group":2,"type":"circle","color":"#414040","size":10},
		{"name":"Adjectives","group":2,"type":"triangle-up","color":"#4CD4B0","size":20},
        {"name":"Noun1","group":2,"type":"diamond","color":"#F18260","size":10},
		{"name":"adj2","group":2,"type":"diamond","color":"#F18260","size":10},
		{"name":"adj3","group":2,"type":"diamond","color":"#F18260","size":10},
        {"name":"adj4","group":2,"type":"diamond","color":"#F18260","size":10},
        {"name":"Nouns","group":2,"type":"triangle-up","color":"#4CD4B0","size":20},
	],
	"links":[
		{"source":0,"target":1,"weight":1},
		{"source":1,"target":2,"weight":3},
        {"source":2,"target":3,"weight":1},
		{"source":3,"target":4,"weight":3},
        {"source":4,"target":5,"weight":3},
        {"source":0,"target":6,"weight":1},
		{"source":6,"target":7,"weight":3},
        {"source":7,"target":8,"weight":3},
        {"source":8,"target":9,"weight":3}
	]
          
};
          // svg try :#D3E9BA
          var svg = d3.select(element[0]).append("svg")
                  .style('width', width).
          style('background', "#93BFB6").
                style('height', height);
          ;
          /*.attr("height", height);*/
          
          // force to set node and links !!
        var force = d3.layout.force()
                    .gravity(.05)
                    .distance(70)
                    .charge(-100)
                    .size([width, height]);
    force.nodes(graph.nodes)
        .links(graph.links)
        .start();

 /* var link = svg.selectAll(".link")
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
      .attr("r","15");
#93BFB6
  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });
*/
         var group = svg.append('g');
        /*  group.append('svg:rect')
    .attr('width', width)
    .attr('height',  height)
    .attr('stroke', "#666")
          .attr("fill","#ABB7B7")
    .attr("stroke-width","1");
*/
var link = group.selectAll("g.line")
			.data(graph.links)
            .enter().append("g")
            .attr("class","line")
            .append("line")
			.style("stroke", function(d) {return d.weight ;})
			.attr("stroke-opacity", '1' )
			.attr("stroke-width",'2')
			.on("mouseover", function(){d3.select(this).style("stroke", "#F29B34").attr("stroke-width",'5');})
			.on("mouseout", function(){d3.select(this).style("stroke", "#666" ).attr("stroke-width",'2')} );
          
       var labelLine = svg.selectAll("g.line")
                .append("text")
                .attr("text-anchor", "middle") 
				.attr('dy','4px') 
                .attr("fill",'#333')
                .style("pointer-events", "none")
                .style('text-transform','uppercase')
				.style('font-weight','bold')
				.attr("font-size", '18px')
				.text(function(d) { return d.weight } );
          
          link.append("title")
				.text(function(d) { return d.weight } );
          console.log(group);
          
     var node = group.selectAll("g.node")
			.data(graph.nodes)
			.enter().append("svg:g")
			.attr("class","node")
			.call(force.drag);
			
			node.append("svg:path")
				.attr("d", d3.svg.symbol().type(function(d) { return d.type; })
				.size(function(d) { return d.size*100; }))
				.style("stroke","#555")
				.style("stroke-width","2")
				.style("fill",function(d) { return d3.rgb(d.color);} )
				.on("mouseover", function(){ d3.select(this).style("fill", "#fff");})
				.on("mouseout", function(d) { d3.select(this).style("fill",function(d) { return d.color ;} ) }  );
				
			node.append("svg:text")
				.attr("text-anchor", "center") 
				.attr('dy','2px')
				.attr("fill",'#fff')
                .style("text-shadow","0px 1px 3px #333")
				.style("pointer-events", "none")
				.style('text-transform','uppercase')
                .style('font-family',"Open Sans")
				.attr("font-size", '12px' )
				.text( function(d) { return d.name ;} );
				
			node.append("title")
				.text(function(d) { return  d.name } );
     
          
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
      // CHECK POSITION
      node[0].x = width / 2;
    node[0].y = height / 4;   
       labelLine.attr("x", function(d) {
          return (d.source.x + d.target.x)/2; })
      .attr("y", function(d) {
          return (d.source.y + d.target.y)/2; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
           }
      
      )};
      }}});







    
 
      
      
