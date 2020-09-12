var inicio_mod = angular.module('sig_app', [])

inicio_mod.directive('headerLeft', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/headerLeft.html',    
    }
});
inicio_mod.directive('headerMenu', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/headerMenu.html',
        scope: {
        	usuario : '@'
        }  
    }
});
inicio_mod.directive('footerSesa', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/footer.html',
    }
});
inicio_mod.directive('loading', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/loading.html',
    }
});
inicio_mod.directive('tituloSistema', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/tituloSistema.html',
    }
});
inicio_mod.directive('ondeEstou', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/ondeEstou.html',
        scope: {
        	pagina : '@',
        	subpagina : '@',
        	icone : '@'
        }  
    }
});

inicio_mod.directive('alteraSenha', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/alteraSenha.html',
		 replace: true,
	};
});

function meu_controller($scope, $http){

/*
	if(!sessionStorage.getItem('nome'))
		location.href= "../index.html"; */

	$scope.menus =  [ 
					  {
					    "nome" : "Gestores",
					    "icone" : "fa fa-user",
					    "link" : "gestores.html",
					  },
					  {
					    "nome" : "Professores",
					    "icone" : "fa fa-graduation-cap",
					    "link" : "professores.html",
					  },
					  {
					    "nome" : "Disciplinas",
					    "icone" : "fa fa-book",
					    "link" : "disciplinas.html",
					  },
					  {
					    "nome" : "Turmas",
					    "icone" : "fa fa-sitemap",
					    "link" : "turmas.html",
					  },
					  {
					    "nome" : "Grade Curricular",
					    "icone" : "fa fa-table",
					    "link" : "grade.html",
					  },
					  {
					    "nome" : "Alunos",
					    "icone" : "fa fa-users",
					    "link" : "alunos.html",
					  },
					  {
					    "nome" : "Notas",
					    "icone" : "fa fa-pencil-square-o",
					    "link" : "notas.html",
					  }
					];

		$scope.titulo = "SIN";
		$scope.subtitulo = "Sistema Informatizado de Notas";

		$scope.teste = function( unidade){
			$scope.unidade = unidade;
		}
		
		$scope.usuario = function(){
			return sessionStorage.getItem('nome');
		}

		$scope.listar_unidades = function(){
			var url = 'http://172.29.2.30:8087/sigews/webresources/telefoniacustos/';
			$http.get(url).
		  	success(function(data, status, headers, config) {
		  		$scope.cargos_vac = [];
		  		var cargos =[];
		  		for(var i = 0; i < data.length; i++){
		  			 if(cargos.indexOf(data[i]['unidade']) === -1){
		  			 	cargos.push(data[i]['unidade']);
		  			 }
		  		}
		  		for(var i = 0; i < cargos.length; i++){
		  			$scope.cargos_vac.push({"nome": cargos[i]});
		  		}
		  }).
		  error(function() {
		  		alert('Não foi possivel carregar os Dados');
		  });
		}

}
