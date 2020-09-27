function FuncionariosCtrl ($scope, $rootScope, $http){	
  /*
	if(!sessionStorage.getItem('nome'))
		location.href= "../index.html"; */

	$scope.usuario = function(){
		return sessionStorage.getItem('nome');
  }

	$scope.lista_solicitacoes = function(){ 
    $scope.loading = true;
    $('#tabela').dataTable().fnClearTable();
    $('#tabela').dataTable().fnDestroy();
    document.getElementById('tabela').innerHTML = document.getElementById('tabela').innerHTML;
    setSelecionado(0);
    var t = $('#tabela').DataTable({
      "columns": [
          { "width": "5%" },
          { "width": "35%" },
          { "width": "15%" },
          { "width": "15%" },
          { "width": "15%" },
          { "width": "15%" },],
      "info": false,
      "paging" : false
    });
    

    $http({
      method: 'GET',
      url: URL+'empregados',     
    }).then(function successCallback(response) {
        console.log(response.data);
        response.data.forEach(dado => 
          t.row.add([
            dado.id,
            dado.nome,
            dado.data_de_nascimento,
            dado.cpf,
            dado.email,
            dado.banco,
          ]).draw());
          $scope.loading = false;
      }, function errorCallback(response) {
        alert('Não foi possivel carregar os Dados');
      });
    

    instancia_click();
	}

  $scope.salvar = function(){
    console.log($scope.empregado);
    $http({
      method: 'POST',
      url: URL+'empregados',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, 
      data: $scope.empregado
    }).then(function successCallback(response) {
         swal({   title: 'Cadastrado com sucesso!',   type: 'success',   timer: 2500 });
         $scope.lista_solicitacoes();
         $('#modal').modal('toggle');
         setSelecionado(0);
      }, function errorCallback(response) {
        console.log('erro');
      });
  }

  $scope.excluir = function(){
    swal({   title: 'Excluir?',   text: 'Você tem certeza que deseja excluir?',  type: 'warning', cancelButtonText: 'Cancelar',  showCancelButton: true,   confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Sim, Excluir!',   closeOnConfirm: false }, function() {  
  
    var table = $('#tabela').DataTable();
    var dados = table.rows('.selected').data();
    $http({
      method: 'DELETE',
      url: URL+'empregados/'+dados[0][0],
    }).then(function successCallback(response) {
        swal({   title: 'Excluido com Sucesso',   type: 'success',   timer: 2500 });
        $scope.lista_solicitacoes();
      }, function errorCallback(response) {
        alert('erro' + JSON.stringify(response.data));
      });
    });
  }

}


