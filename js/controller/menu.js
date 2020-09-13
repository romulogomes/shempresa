function MenuCtrl ($scope, $rootScope, $http){

	$scope.menus =  [{
					    "nome" : "Solicitações",
					    "icone" : "clip-file-2",
					    "link" : "solicitacoes.html",
					  },
					  {
					    "nome" : "Funcionários",
					    "icone": "clip-file-2",
					    "link" : "funcionarios.html",
					  },
					];			

	$rootScope.titulo = "Farmácia do Jauro";
	$rootScope.subtitulo = "";

}