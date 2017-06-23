define(['angular', './px-module'], function(angular, pxModule) {
    'use strict';
    return pxModule.controller('ShowAnswerCtrl', ['$state','$window','$scope','$http','$stateParams', function( $state,$window,$scope,$http,$stateParams) {
        // $scope.dummyData=[{"ID":"1","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"2","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"3","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"4","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"5","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"6","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"7","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"8","Question":"Meyer","Answer":"valentinemeyer@scentric.com"},{"ID":"9","Question":"Alexander","Answer":"silvaalexander@gmail.com"},{"ID":"10","Question":"Wong","Answer":"hopkinswong@hotmail.com"},{"ID":"11","Question":"Sherman","Answer":"joejoe@yahoo.com"},{"ID":"12","Question":"Bartlett","Answer":"jane@scentric.com"}];

        $('#loadingArea').showLoading();
        $http({
            url: '/manage/answerManage/getAnswerList/',
            method: 'GET'
        }).then(function (data) {
            var datas = angular.toJson(data.data).replace(new RegExp(/"question":/g),'"intend":');
            $scope.dummyData = datas;
            $('#loadingArea').hideLoading();
        });


        $scope.createAnswer = function(){
            $state.go("createAnswer");
        }

        $scope.edit = function(){
            $scope.allSelectedRows = document.getElementById("mytable").selectedRows;
            var editObj = angular.fromJson($scope.allSelectedRows);
            if(editObj.length!=1){
                alert('Please select only one row to edit');
            }else{
                $state.go("editAnswer",{paramId:angular.fromJson(document.getElementById("mytable").selectedRows)[0].row.id.value});
            }

        }

        $scope.delete = function(){

                $scope.allSelectedRows = document.getElementById("mytable").selectedRows;
                var deleteObj = angular.fromJson($scope.allSelectedRows);
                var deleteIds = '';
                if(deleteObj.length==0){
                    alert('Please select at least 1 row');
                }else{
                    if(confirm("Are you sure to delete these answers ?")){
                        $('#loadingArea').showLoading();
                        for(var i = 0;i<deleteObj.length;i++){
                            if(i!=deleteObj.length-1){
                                deleteIds+= deleteObj[i].row.id.value+',';
                            }else{
                                deleteIds+=deleteObj[i].row.id.value;
                            }
                        }
                    }
                    $http({
                        url: '/manage/answerManage/deleteAnswers'+'?deleteIds='+deleteIds,
                        method: 'GET'
                    }).then(function (data) {
                        $('#loadingArea').hideLoading();
                        $window.location.reload();
                    });
            }

        }

    }]);
});
