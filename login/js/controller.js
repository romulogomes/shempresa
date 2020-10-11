function meucontroller($scope, $http){
	
	$scope.envia = function(){
		if($scope.usuario == "farmaciadojauro" && $scope.senha == "jesus"){
			sessionStorage.setItem('nome', 'Farmácia do Jauro');
			sessionStorage.setItem('empresa_id', 1);
			location.href="../solicitacoes.html";
		} else if ($scope.usuario == "empresa_teste" && $scope.senha == "jesus") {
			sessionStorage.setItem('nome', 'Empresa de Testes');
			sessionStorage.setItem('empresa_id', 2);
			location.href="../solicitacoes.html";
		} else {
			alert("Usuário e/ou Senha incorreta");
		}
  }
}

	


 
