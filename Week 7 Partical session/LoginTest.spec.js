describe("LoginController", function(){
	beforeEach(module("testApp"));
	var mockResourceTrue = {
    	isValidUserAndPass: function(user, pass) {
       		return true;
    	}
	};
	var mockResourceFalse = {
    	isValidUserAndPass: function(user,pass) {
        	return false;
    	}
	};
	var mockLocation = {
		path: function(p) {
		}
	};
	describe("LoginController", function() {
		beforeEach(inject(function($controller, $rootScope){
			spyOn(mockLocation, "path");
			$scope = $rootScope.$new();
			controller = $controller("LoginController", {
				$scope: $scope,
				LoginResource: mockResourceTrue,
				$location: mockLocation 
			});
			$scope.onLogin();
		}));
		//A
		it("function should be declared on onLogin", function() {
			expect($scope.onLogin).toBeDefined();
		});
		//B
		it("Should redirect to about page", function() {
			expect(mockLocation.path).toHaveBeenCalledWith("/about");
		});
	});
	describe("LoginController", function(){
		beforeEach(inject(function($controller, $rootScope){
			spyOn(mockLocation, "path");
			$scope = $rootScope.$new();	
			controller = $controller("LoginController", {
				$scope: $scope,
				LoginResource: mockResourceFalse,
				$location: mockLocation
			});
		}));
		//C
		it("path() function has NOT been called", function() {
			expect(mockLocation.path).not.toHaveBeenCalled();
		});
	});
});