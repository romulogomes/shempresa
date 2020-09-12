function disciplinas_controller($scope, $http){
    $scope.selecionado = false;
    var id_escola = sessionStorage.getItem('id_escola');

    $scope.lista_disciplinas = function(){
    	$scope.loading = true;
     	var url = 'http://localhost/sin/sin_ws/lista_disciplinas.php?id='+id_escola;
			$http.get(url).
		  	success(function(data) {
          var t = $('#tabela').DataTable({
		  			 "pageLength": 10
		  		});
          $scope.loading = false;
          if(data.erro)
            return false;
          
		  		for(var i = 0; i < data.length; i++){
			  		t.row.add( [
		                 data[i]['id_disciplina'],
		                 data[i]['nome'],
		            ]).draw();    
			  	}
			  	instancia_click();
		  }).
		  error(function() {
		  		alert('Não foi possivel carregar os Dados');
		  });
    }

    $scope.cadastra_disciplina = function(){
    	var url = 'http://localhost/sin/sin_ws/cadastra_disciplinas.php';
      
      if(!$scope.nome){
        document.getElementById('cadastro_erro').style.display = "block";
        return false;
      }
    	var dados = {
            "nome" : $scope.nome,
            "escola_fk" : id_escola
        };
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             $('#modal_cadastrar').modal('toggle');
             swal({   title: 'Cadastrado com Sucesso',   type: 'success',   timer: 2500 });
             
             $('#tabela').dataTable().fnClearTable();
      			 $('#tabela').dataTable().fnDestroy();
      			 $scope.lista_disciplinas();
      			 instancia_click();
             document.getElementById('cadastro_erro').style.display = "none";
      			 $scope.nome = '';

          }, function errorCallback(response) {
            console.log('erro');
          });
    }

    $scope.excluir_disciplina = function(){
    swal({   title: 'Excluir Disciplina',   text: 'Você tem certeza que deseja excluir?',   type: 'warning',   showCancelButton: true,   confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Sim, Excluir!',  cancelButtonText: 'Cancelar',  closeOnConfirm: false }, function() {    

    var url = 'http://localhost/sin/sin_ws/cadastra_disciplinas.php';
    var table = $('#tabela').DataTable();
		var dados = table.rows('.selected').data();

		var dados = {
            "funcao" : "excluir",
            "id_disciplina" : dados[0][0] 
        };

        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
           console.log(response.data);
           swal({   title: 'Excluido com Sucesso',   type: 'success',   timer: 2500 });
             
           $('#tabela').dataTable().fnClearTable();
    			 $('#tabela').dataTable().fnDestroy();
    			 $scope.lista_disciplinas();
    			 setSelecionado(0);
    			 instancia_click();
          }, function errorCallback(response) {
            console.log('erro');
          });

        });
    }

    $scope.monta_edit = function(){
    	var table = $('#tabela').DataTable();
		  var dados = table.rows('.selected').data();

    	document.getElementById('id_disciplina').value = dados[0][0];
      document.getElementById('nome_edit').value = dados[0][1];
    }

    $scope.editar_disciplina = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_disciplinas.php';
    	
      var nome = document.getElementById('nome_edit').value;
      var id_disciplina = document.getElementById('id_disciplina').value;
      
      if(!nome){
        document.getElementById('edit_erro').style.display = "block";
        return false;
      }
      var dados = {
            "nome" : nome,
            "id_disciplina" : id_disciplina
      };
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             swal({   title: 'Disciplina Atualizada',   type: 'success',   timer: 2500 });
             $('#modal_editar').modal('toggle');
             $('#tabela').dataTable().fnClearTable();
             $('#tabela').dataTable().fnDestroy();
             $scope.lista_disciplinas();
             setSelecionado(0);
             instancia_click();
          }, function errorCallback(response) {
            console.log('erro');
          });
        }
}

