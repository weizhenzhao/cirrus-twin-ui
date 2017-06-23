define(['angular', './px-module'], function(angular, pxModule) {
    'use strict';
    return pxModule.controller('CreateAnswerCtrl', ['$state','$scope','$http','$stateParams', function($state,$scope,$http,$stateParams) {
        $scope.answer = {} ;
        $scope.image = {} ;

        $scope.$on('$destroy', function(){
            // editor.destroy();
            // $('#containerTd').remove();
        });
        $scope.cancel=function(){
            history.go(-1);
        }

        function trim(str){
            return str.replace(/(^\s*)|(\s*$)/g, '');
        }

        $scope.save = function(){
            $('#loadingArea').showLoading();
            var intendStr = trim($('#questionVal').val());
            if(trim($('#questionVal').val())==''){
                $('#loadingArea').hideLoading();
                alert('Intend can not be empty');
                return;
            }else if(trim($('#answerVal').val())==''){
                $('#loadingArea').hideLoading();
                alert('Answer can not be empty');
                return;
            }

            $http({
                url: '/manage/answerManage/checkIntend/'+trim(intendStr)+'/',
                data: $scope.answer,
                method: 'GET'
            }).then(function (data) {
                var intendCount = angular.fromJson(data).data;
                if(intendCount!='0'){
                    $('#loadingArea').hideLoading();
                    alert('Sorry, there is already a duplicate intend exists.');
                }else{
                    var html = editor.$txt.html();
                    var imgNames = new Array();
                    var imgContent=new Array();
                    var imgs = editor.$txt.find('img');
                    for(var i = 0 ;i<imgs.length;i++){
                        var timestamp = Date.parse(new Date());
                        imgContent[i] = imgs[i].src.split('base64,')[1];
                        imgs[i].src = timestamp+'_'+i;
                        imgNames[i] = timestamp+'_'+i;
                    }
                    var uploadHtml = editor.$txt.html();
                    $scope.answer.fileNames= imgNames ;
                    if(imgNames.length==0&&(trim(editor.$txt.text())=="")){
                        uploadHtml= " ";
                    }

                    $scope.answer.detailAnswer= trim(uploadHtml);

                    $http({
                        url: '/manage/answerManage/saveAnswerDetails',
                        data: $scope.answer,
                        method: 'POST'
                    }).then(function (data) {
                            if(i<imgs.length==0){
                                $('#loadingArea').hideLoading();
                                $state.go("showAnswer");
                            }
                            $scope.image.fileName =   imgNames;
                            $scope.image.fileContent = imgContent;
                            $scope.image.paramId = angular.fromJson(data.data).id;
                            $http({
                                url: '/manage/answerManage/saveImages',
                                data: $scope.image,
                                method: 'POST'
                            }).then(function (data) {
                                $('#loadingArea').hideLoading();
                                $state.go("showAnswer");
                            });

                    });
                }});


        }


    }]);
});
