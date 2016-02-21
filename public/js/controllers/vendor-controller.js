"use strict";

angular.module('myApp')
  .controller('VendorController', ['$scope', 'VendorService', '$location', '$rootScope', '$localStorage', '$routeParams', '$route', function($scope, VendorService, $location, $rootScope, $localStorage, $routeParams, $route){
    $scope.vendorPrivate=true;
    $scope.vendorValue=true;
    $scope.Vendors = [];
    $scope.VendorService = VendorService;
    VendorService.getVendors().success(function(data) {
      $scope.Vendors = data;
    });

    $scope.registerVendor = function(vendor) {
      if(!vendor.username && vendor.password && vendor.phone && vendor.email && vendor.description) {
        $scope.error = "Please fill out all required fields";
      } else if(vendor.password !== vendor.verifyPassword) {
          $scope.error = "Passwords do not match";
      } else {
          VendorService.regVendor(vendor).success(function(result) {
            $rootScope.vendor_user = result;
            $localStorage.vendor_user = $rootScope.vendor_user;
            $location.url('/');
          }).error(function(error) {
              $scope.error = 'Unknow error.  Please try again';
          });
      }
    };

    // $scope.registerUser = function(user) {

    //   if(!user.username && user.password && user.verifyPassword){
    //     $scope.error = "Please completely fill out form";
    //     return false;
    //   }


    //   if(user.password !== user.verifyPassword){
    //     $scope.error = "verify password does not match";
    //     return false;
    //   }

    //   var newUser = {
    //     username : user.username,
    //     password : user.password
    //   };

    //   VendorService.registerUser(newUser).success(function(result){

    //     $location.url('/');
    //   }).error(function(error){
    //     $scope.error = "Please try again";
    //   });
    // };


    $scope.loginVendor = function(vendorLoginCredentials){
      VendorService.loginVen(vendorLoginCredentials).success(function(result) {
        $rootScope.vendor_user = result;
        $localStorage.vendor_user = $rootScope.vendor_user;
        // $scope.vendor_user=true;
        $location.url('/vendor/private');
      }).error(function(error) {
          $scope.error ="Wrong username or password";
      });
    };



    $scope.getVendorAndProducts = function(vendor) {
      $scope.vendor = [];
      $scope.vendorValue=false;
      //var param1 = $routeParams.param1;
      VendorService.getOneVendor(vendor.id).success(function (data){
      $scope.vendor = data;
      });
    };

    // if($route.current.$$route.originalPath==='/vendor/private') {
    //  $scope.getVendorAndProducts({id: 3});

    // }

  }]);