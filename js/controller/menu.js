function MenuCtrl ($scope, $rootScope, $http){

	$scope.menus =  [{
					    "nome" : "Boletim",
					    "icone" : "clip-file-2",
					    "link" : "boletim.html",
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

	$rootScope.titulo = "SIN";
	$rootScope.subtitulo = "Sistema Informatizado de Notas";

}