function MenuCtrl ($scope, $rootScope){

	$scope.menus =  [{
					    "nome" : "Solicitações",
					    "icone" : "clip-file-2",
					    "link" : "solicitacoes.html",
					  },
					  {
					    "nome" : "Funcionários",
					    "icone": "clip-user-3",
					    "link" : "funcionarios.html",
					  },
					];			

	//FIXME: Romulo - setar o nome da empresa no titulo do sistema
	$rootScope.titulo = sessionStorage.getItem('nome');
	$rootScope.subtitulo = "";

}