function Cube(content, index) {
    this.content = content;
    this.index = index;
    this.row = Math.floor(index / 4);
    this.col = index % 4;
    this.canMerge = true;
    this.upwardIndex = this.row==0?-1:(this.index-4);
    this.downwardIndex = this.row==3?-1:(this.index+4);
    this.leftIndex = this.col==0?-1:(this.index-1);
    this.rightIndex = this.col==3?-1:(this.index+1);

    //console.log(this.row+","+this.col+","+this.index+","+this.upwardIndex);
}



var myGame = angular.module("myGame", ["myApp"]);
myGame.controller("gameController", function ($scope, $document, gameService) {
    $scope.cubeList = gameService.initCubeList();
    $scope.score = {value:0};

    $scope.newGame = function(){
        $scope.cubeList = gameService.initCubeList();
    }

    $document.bind("keypress", function (event) {

        var keyCode = event.which || event.keyCode;
        $scope.$apply(function () {
            if (keyCode === 119) {
                gameService.cubeMoveUp($scope.cubeList,$scope.score);
            } else if (keyCode === 97) {
                gameService.cubeMoveLeft($scope.cubeList,$scope.score);
            } else if (keyCode === 115) {
                gameService.cubeMoveDown($scope.cubeList,$scope.score);
            } else if (keyCode === 100) {
                gameService.cubeMoveRight($scope.cubeList,$scope.score);
            }
        })
    })


});

myGame.directive("myCube", function () {
    var myCube = {
        restrict: "A",
        replace: true,
        scope: {
            cube: "=cube"
        },
        template: '<div  ng-class={content_2:cube.content==2,content_4:cube.content==4,content_default:cube.content=="",content_other:cube.content&gt;4}>{{cube.content}}</div>'
    }

    return myCube;
})

myGame.service("gameService", function (commService) {

    return {
        initCubeList: function () {
            var cubeList = new Array();

            for (var i = 0; i < 16; i++) {
                cubeList.push(new Cube("", i));
            }
            for(var i = 0;i<2;i++){
                commService.generatorNumber(cubeList);
            }
            return cubeList;
        },

        cubeMoveUp: function (cubeList,score) {
            for (var i = 4; i < cubeList.length; i++) {
                var cube = cubeList[i];
                var perCube = cubeList[cube.index - 4];

                while (cube.row>0) {
                    cube = this.cubeMove(cube,perCube,cubeList,score);
                    if(cube.row > 0){
                        perCube = cubeList[perCube.index - 4];
                    }
                }
            }

            this.moveEnd(cubeList);
        },

        cubeMoveDown: function (cubeList,score) {
            for (var i = cubeList.length - 5; i >= 0; i--) {
                var cube = cubeList[i];
                var perCube = cubeList[cube.index + 4];

                while (cube.row<3) {
                    cube = this.cubeMove(cube,perCube,cubeList,score);
                    if(cube.row < 3){
                        perCube = cubeList[perCube.index + 4];
                    }
                }
            }

            this.moveEnd(cubeList);
        },

        cubeMoveLeft: function (cubeList,score) {
            for (var i = 0; i < cubeList.length; i++) {
                var cube = cubeList[i];
                var perCube = cubeList[cube.index - 1];

                while (cube.col>0) {
                    cube = this.cubeMove(cube,perCube,cubeList,score);
                    if(cube.col>0){
                        perCube = cubeList[perCube.index - 1];
                    }
                }
            }

            this.moveEnd(cubeList);
        },

        cubeMoveRight: function (cubeList,score) {
            for (var i = cubeList.length - 1; i >= 0; i--) {
                var cube = cubeList[i];
                var perCube = cubeList[cube.index + 1];

                while (cube.col<3) {
                    cube = this.cubeMove(cube,perCube,cubeList,score);
                    if(cube.col<3){
                        perCube = cubeList[perCube.index + 1];
                    }
                }
            }
            this.moveEnd(cubeList);
        },

        cubeMove:function(cube,perCube,cubeList,score){
            if(perCube.content == "" && cube.content != ""){
                perCube.content = cube.content;
                perCube.canMerge = cube.canMerge;
                cube.content = "";
            }else if(perCube.content != "" && cube.content != ""){
                if(perCube.content == cube.content && perCube.canMerge && cube.canMerge){
                    perCube.content = Number(perCube.content)*2+"";
                    perCube.canMerge = false;
                    cube.content = "";

                    score.value = Number(perCube.content) + score.value;
                }
            }
            cube = cubeList[perCube.index];
            return cube;
        },

        moveEnd:function(cubeList) {
            for (var i = 0;i<cubeList.length;i++){
                cubeList[i].canMerge = true;
            }

            commService.generatorNumber(cubeList);

            if (commService.isGameOver(cubeList)) {
                alert("GAME OVER");
            }
        }
    }
});

myGame.service("commService", function () {
    return {
        generatorNumber: function (cubeList) {
            var canGeneratorIndex = new Array();
            for(var i=0;i<cubeList.length;i++) {
                if(cubeList[i].content == ""){
                    canGeneratorIndex.push(i)
                }
            }
            if(canGeneratorIndex.length>0){
                var index = Math.floor(Math.random()*canGeneratorIndex.length);
                cubeList[canGeneratorIndex[index]].content =  Math.random() > 0.5 ? 4 : 2;
            }

        },

        isGameOver: function (cubeList) {
            for(var i=0;i<cubeList.length;i++) {
                var currCube = cubeList[i];
                if(currCube.content == ""){
                    return false;
                }else{
                    if(currCube.upwardIndex>=0 && currCube.content == cubeList[currCube.upwardIndex].content) {
                        return false;
                    }else if(currCube.downwardIndex >=0 && currCube.content ==  cubeList[currCube.downwardIndex].content){
                        return false;
                    }else if(currCube.leftIndex >=0 && currCube.content ==  cubeList[currCube.leftIndex].content){
                        return false;
                    }else if(currCube.rightIndex >=0 && currCube.content ==  cubeList[currCube.rightIndex].content){
                        return false;
                    }
                }
            }

            return true;
        }
    }
})