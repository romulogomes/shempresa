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


}

