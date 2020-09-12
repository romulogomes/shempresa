inicio_mod.controller('altSenhaCtrl', ['$scope', '$http', function($scope, $http){
	
	$scope.alterar = function() {

		var id = sessionStorage.getItem('id');
		var login = sessionStorage.getItem('login');
		var senha = $scope.usuario.senha;
		var novaSenha = $scope.usuario.novaSenha;

		var jsonObj = JSON.stringify({"id": id,"login":login, "senha": senha, "novaSenha": novaSenha});

		$http.put('http://172.29.0.30:8087/sigews/webresources/login/'+id, jsonObj)
	    .success(function(data, status, headers, config) {
	        alert('Senha Alterada com Sucesso');
	        $('#AltSenha').modal('hide');
	        $scope.limpar();
	        
	      })
	    .error(function(data, status, headers, config) {
	        alert('Error: '+ JSON.stringify(data[0]['mensagemErro']));
	        $scope.limpar();
	    });

	    return true;
	};

	$scope.limpar = function(){
		if($scope.usuario) {
			$scope.usuario = {};
		}
		$scope.formAltSenha.$setPristine();
	}	
}]);

