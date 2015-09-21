/**
 * @author jie.tang
 * @type {module}
 */
var testModule = angular.module("testApp",[]);
testModule.controller("testController", function ($scope) {
    $scope.person = [{name:"tangjie",alias:"jiege"},
        {name:"aangjie1",alias:"jiege1"}];
});

testModule.filter("myFilter", function () {
    return function(data,flag){
        return data;
    }
})