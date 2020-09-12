function MenuCtrl ($scope, $rootScope, $http){

	$scope.menus =  [{
					    "nome" : "Solicitações",
					    "icone" : "clip-file-2",
					    "link" : "solicitacoes.html",
					  },
					  {
					    "nome" : "Rendimento Escolar",
					    "icone" : "clip-stats",
					    "link" : "rendimento.html",
					  },
					  {
					    "nome" : "Grade Curricular",
					    "icone" : "fa fa-book",
					    "link" : "grade.html",
					  }
					];			

	$rootScope.titulo = "Farmácia do Jauro";
	$rootScope.subtitulo = "";

}