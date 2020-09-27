function FuncionariosCtrl ($scope, $rootScope, $http){	

  $scope.modo = "listagem";
  
	$scope.usuario = function(){
		return sessionStorage.getItem('nome');
  }

  $scope.adicionar_novo = function(){
    $scope.nome = $scope.cpf = $scope.salario = $scope.data_de_nascimento = $scope.empregado_id = undefined;
    $scope.modo = "edicao";
  }

	$scope.listar = function(){ 
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
      "info": true,
      "paging" : true,
      "pageLength": 10,
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
            dado.salario,
          ]).draw());
          $scope.loading = false;
      }, function errorCallback(response) {
        alert('Não foi possivel carregar os Dados');
      });
    
    instancia_click();
	}

  $scope.salvar = function(){
    $scope.loading = true;
    method = "";
    dados = {
      nome: $scope.nome,
      data_de_nascimento: $scope.data_de_nascimento,
      cpf: $scope.cpf,
      salario: $scope.salario
    }
    if($scope.empregado_id)  {
      dados.id = $scope.empregado_id;
      method = $scope.atualizar(dados);
    } else {
      method = $scope.incluir(dados);
    }
    $scope.loading = false;
  }

  $scope.incluir = function(dados){
    $http({
      method: 'POST',
      url: URL+'empregados',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, 
      data: dados
    }).then(function successCallback(response) {
      swal({ title: 'Cadastrado com sucesso!', type: 'success', timer: 2500 });
      $scope.listar();
      setSelecionado(0);
      $scope.modo = "listagem";
      $scope.loading = false;
    }, function errorCallback(response) {
      alert('Erro '+ response.data);
    });
  }

  $scope.atualizar = function(dados){
    $http({
      method: 'PUT',
      url: URL+'empregados/'+dados.id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, 
      data: dados
    }).then(function successCallback(response) {
      swal({ title: 'Atualizado com sucesso!', type: 'success', timer: 2500 });
      $scope.listar();
      $scope.modo = "listagem";
      setSelecionado(0);
      $scope.loading = false;
    }, function errorCallback(response) {
      console.log('erro');
    });
  }

  $scope.cancelar = function(){
    $scope.modo = "listagem";
  }

  $scope.monta_edit = function(){
    $scope.loading = true;
    var table = $('#tabela').DataTable();
    var dados = table.rows('.selected').data();
    $http({
      method: 'GET',
      url: URL+'empregados/'+dados[0][0],     
    }).then(function successCallback(response) {
        console.log(response.data);
        dados = response.data
        $scope.empregado_id = dados.id;
        $scope.nome = dados.nome;
        $scope.cpf = dados.cpf;
        $scope.salario = dados.salario;
        $scope.loading = false;
        $scope.modo = "edicao";
      }, function errorCallback(response) {
        alert('Não foi possivel carregar os Dados');
      });

  }

  $scope.excluir = function(){
    swal({title: 'Excluir?', text: 'Você tem certeza que deseja excluir?', type: 'warning', cancelButtonText: 'Cancelar', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Sim, Excluir!', closeOnConfirm: false }, function() {  
    var table = $('#tabela').DataTable();
    var dados = table.rows('.selected').data();
    $scope.loading = true;
    $http({
      method: 'DELETE',
      url: URL+'empregados/'+dados[0][0],
    }).then(function successCallback(response) {
        swal({ title: 'Excluído com Sucesso', type: 'success', timer: 2500 });
        $scope.listar();
        $scope.loading = false;
      }, function errorCallback(response) {
        alert('erro' + JSON.stringify(response.data));
        $scope.loading = false;
      });
    });
  }

}


