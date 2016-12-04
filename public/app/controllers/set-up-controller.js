app.controller('setUpController', function($scope, userInfo, $location){
	
	function checkInput(callback){
		
		if($scope.info.nickName.length === 0){
			$scope.showError = true;
			return; 
		}
		callback();
	}
	
	// if info is valid open the chat room
	$scope.enter = function(){
		checkInput(function(){
			$location.url('/online');
		});
	};
	
	// reset to default
	$scope.reset = function(){
		$scope.info = userInfo.resetInfo();
		$scope.showError = false;
	};
	
	// init function
	function init(){
		$scope.info = userInfo.getInfo();
		$scope.showError = false;
	}
	
	init();
});
