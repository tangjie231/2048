var myApp = angular.module("myApp", []);
myApp.controller("navController",function($scope,actionService){
    $scope.actionList = actionService.getUserList();
    $scope.showMessage = function(message){
        return actionService.showMessage(message);
    }
});

myApp.directive("menuAction",function(actionService){
    var menuAction = {
        restrict:"A",
        replace:true,
        scope:{
            info:"=",
            show : "&showMessage"
        },
        template:'<li><a ng-click=show()><i class="icon-user"></i>{{info.displayName}}</a></li>'
    }

    return menuAction;
});

myApp.service("actionService", function (){
    return {
        getUserList: function () {
            return [
                {url: "http://www.baidu.com", displayName: "menu1"},
                {url: "http://www.baidu.com", displayName: "menu2"},
                {url: "http://www.baidu.com", displayName: "menu3"},
                {url: "http://www.baidu.com", displayName: "menu4"},
                {url: "http://www.baidu.com", displayName: "menu5"}

            ]
        },
        showMessage:function(message){
            alert("run here "+message);
        }
    }
});
