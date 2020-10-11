inicio_mod.controller('altSenhaCtrl', ['$scope', '$http', function($scope, $http){
	
	$scope.alterar = function() {
		alert("em breve");
	};

	$scope.limpar = function(){
		if($scope.usuario) {
			$scope.usuario = {};
		}
		$scope.formAltSenha.$setPristine();
	}	
}]);

