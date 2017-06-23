define(['angular', './px-module'], function(angular, pxModule) {
    'use strict';
    return pxModule.controller('EditAnswerCtrl', ['$state','$scope','$http','$stateParams', function($state,$scope,$http,$stateParams) {


        $scope.answer = {} ;
        $scope.image = {} ;
        var elem = $('#editor-trigger').get(0);
        var editor = new wangEditor(elem);
        editor.config.uploadImgUrl = '/upload';
        editor.config.lang = wangEditor.langs['en'];
        editor.config.emotionsShow = 'value';
        editor.create();
        $('#containerTd').height(parseInt(document.documentElement.clientHeight-400)+'px');
        $('.wangEditor-txt').height(parseInt(document.documentElement.clientHeight-460)+'px');

        function trim(str){
            return str.replace(/(^\s*)|(\s*$)/g, '');
        }
        var paramId = $stateParams.paramId;
        $scope.answer.id = paramId;
        $http({
            url: '/manage/answerManage/editAnswer/'+paramId,
            method: 'GET'
        }).then(function (data) {

            var answer = angular.fromJson(data.data);
            $scope.answer.question = trim(answer.question);
            $scope.answer.answer = trim(answer.answer);
            $scope.answer.detailAnswer = trim(answer.detailAnswer);
            var fileNames = answer.fileNames.splice(',');
            if(fileNames.length>0){
                    $scope.image.paramId=paramId;
                    $http({
                        url: '/manage/answerManage/loadImages/',
                        method: 'POST',
                        data:$scope.image
                    }).then(function (data) {
                        var tempHtml = $scope.answer.detailAnswer;
                        for(var i=0;i<angular.fromJson(data.data).length;i++){
                            var answerDetail = angular.fromJson(angular.fromJson(data.data)[i]);
                            var tempName=trim(answerDetail.fileName);
                            tempHtml = tempHtml.replace(tempName,'data:image/png;base64,'+answerDetail.fileContent);
                        }
                           editor.$txt.append(tempHtml);
                    });
            }else{
                editor.$txt.append(answer.detailAnswer);
            }


        });

        $scope.cancel=function(){
            history.go(-1);
        }

        $scope.update = function(){
            $('#loadingArea').showLoading();
            if(trim($('#questionVal').val())==''){
                $('#loadingArea').hideLoading();
                alert('Intend can not be empty');
                return;
            }else if(trim($('#answerVal').val())==''){
                $('#loadingArea').hideLoading();
                alert('Answer can not be empty');
                return;
            }
            $scope.answer.queston = trim($('#questionVal').val());
            $http({
                url: '/manage/answerManage/checkIntendForUpdate/'+trim($scope.answer.queston)+'/'+paramId,
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

                    $scope.answer.id=paramId;

                    $http({
                        url: '/manage/answerManage/updateAnswerDetails',
                        data: $scope.answer,
                        method: 'POST'
                    }).then(function (data) {
                        if(i<imgs.length==0){
                            $('#loadingArea').hideLoading();
                            $state.go("showAnswer");
                        }
                            $scope.image.fileName =   imgNames;
                            $scope.image.fileContent = imgContent;
                            $scope.image.paramId = paramId;
                            $http({
                                url: '/manage/answerManage/updateImages',
                                data: $scope.image,
                                method: 'POST'
                            }).then(function (data) {
                                if(i==imgs.length-1){
                                    $('#loadingArea').hideLoading();
                                    $state.go("showAnswer");
                                }
                            });



                    });
                }



            });

        }


    }]);
});
