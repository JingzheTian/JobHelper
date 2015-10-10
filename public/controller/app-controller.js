angular.module("app")
.constant("pageCount", 5)
.controller("appCtrl",function($scope,$http,$filter,pageCount){
        
        $scope.loginShow = true;
        $scope.bodyShow = false;
        $scope.userName= "";


        var refresh = function(){
            $http.get("/jobList/" + $scope.userName).success(function(response){
            //console.log(response);
            $scope.items = response;
            });
        }
        
        $scope.login = function(loginName){
            $scope.loginShow = false;
            $scope.bodyShow = true;
            $scope.userName = loginName;
            refresh();
        }

        $scope.register = function(loginName){
            $scope.loginShow = false;
            var user = {userName: loginName}
            $http.post('/userlist', user).success(function(response){
                console.log(response.userName);
                $scope.userName= response.userName;
            });

        }

        $scope.add= false;
       

       
       
        $scope.selectedPage = 1;
        $scope.pageSize = pageCount;
               
        $scope.$watch("pageSize", function(){
            //console.log($scope.pageSize);
        }); 
               
        $scope.addItems = function(){

            var newDate = new Date();
            $scope.item.cdate = newDate.toString().substring(0,15);
            $scope.item.username = $scope.userName;
            
            //console.log(JSON.stringify($scope.items));
            $http.post('/joblist', $scope.item).success(function(response){
                console.log(response);
            });
            refresh();
            $scope.item = "";
        }
        
        $scope.editItem = function(id){
             console.log(id);
             $scope.add= true;
             $http.get('/joblist/' + id).success(function(response){
                console.log(response);
                $scope.item = response;   
             });
        };
        
        $scope.updateItem = function(){
              console.log($scope.item._id);
              $http.put('/joblist/' + $scope.item._id, $scope.item).success(function(response){
                $scope.item = "";
                refresh();
                $scope.add= false;
            });                
        };
        
        $scope.deleteItem = function(id){
            console.log(id);
            $http.delete('/jobList/' + id).success(function(response){
                refresh();    
            });
        };
        
        $scope.clear = function(){
            refresh();
            $scope.add= false; 
        };
        
                
        $scope.getPageClass = function(page){
            return $scope.selectedPage == page ? "btn btn-primary" : "btn btn-default";
        };
        
        $scope.selectPage = function(newPage){
            $scope.selectedPage = newPage;   
        };
    
})
.directive('appHeader', function(){ // header
        return{
                restrict: 'E',
                templateUrl: 'views/appHeader.html'
        };
})
.directive('appBody', function(){
        return{
            restrict: 'E',
            templateUrl: 'views/appBody.html'
        };
})
.directive('appLogin', function(){
        return{
            restrict: 'E',
            templateUrl: 'views/login.html'
        };
});


