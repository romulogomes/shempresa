function meucontroller($scope, $http){
	
	$scope.envia = function(){
		if($scope.usuario == "farmaciadojauro" && $scope.senha == "jesus"){
			sessionStorage.setItem('nome' , 'Farmácia do Jauro');
			location.href="../solicitacoes.html";
		} else {
			alert("Usuário e/ou Senha incorreta");
		}
  }
}

	


 
