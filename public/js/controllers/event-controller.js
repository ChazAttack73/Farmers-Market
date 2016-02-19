"use strict";

angular.module('myApp')
.controller('EventController', ['$scope', 'EventService', '$rootScope', 'VendorService', '$location', '$localStorage', function($scope, EventService, $rootScope, VendorService, $location, $localStorage){
  $scope.Events = [{
    name : "Manoa Marketplace",
    address: "2752 Woodlawn Drive",
    days: "Tuesday, Thursday, Sunday",
    time: "7:00 AM to 11:00"
  }];
  $scope.Events = [];
  $scope.vendor = {
    createdBy : $rootScope.creator_user
  };
  $scope.ProductService = ProductService;
  ProductService.getProducts().success(function(data){
    $scope.Products = data;
  });

  $scope.Vendors = [];
    $scope.VendorService = VendorService;
    VendorService.getVendors().success(function(data) {
      $scope.Vendors = data;
    });

  $scope.postButton=function(product) {
    ProductService.addProduct(product).then(function(data) {
      $scope.add_product = false;
      $scope.Products.push(data.data);
    });
  };
  $scope.submitEdit = function(product) {
    ProductService.editProduct(product).then(function(data){
      ProductService.getProducts().success(function(data){
        $scope.Products = data;
      });
    });
  };
  $scope.delProduct = function(product) {
    ProductService.deleteProduct(product).then(function(data) {
      ProductService.getProducts().success(function(data){
        $scope.Products = data;
      });
    });
  };
}]);