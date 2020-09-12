function turmas_controller($scope, $http){
    $scope.tela = 1;

    $scope.setTela = function(){
      if($scope.tela == 1)
        $scope.tela = 2;
      else
        $scope.tela = 1;
    }
    
    var id_escola = sessionStorage.getItem('id_escola');

    $scope.lista_turmas = function(){
    	$scope.loading = true;
     	var url = 'http://localhost/sin/sin_ws/lista_turmas.php?id='+id_escola;
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
		                 data[i]['id_turma'],
		                 data[i]['serie'] + 'º',
                     data[i]['turma'],
                     data[i]['turno'],
                     data[i]['ano']
		            ]).draw();    
			  	}
			  	instancia_click();
		  }).
		  error(function() {
		  		alert('Não foi possivel carregar os Dados');
		  });
    }

    $scope.cadastra_turma = function(){
    	var url = 'http://localhost/sin/sin_ws/cadastra_turmas.php';
      
      if(!$scope.serie || !$scope.turma || !$scope.turno  || !$scope.ano){
        document.getElementById('cadastro_erro').style.display = "block";
        return false;
      }
    	var dados = {
            "serie" : $scope.serie,
            "turma" : $scope.turma,
            "turno" : $scope.turno,
            "ano": $scope.ano,
            "escola_fk" : id_escola
        };

        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             $('#modal_cadastrar').modal('toggle');
             swal({   title: 'Turma Cadastrada com Sucesso',   type: 'success',   timer: 2500 });
             
             $('#tabela').dataTable().fnClearTable();
      			 $('#tabela').dataTable().fnDestroy();
      			 $scope.lista_turmas();
      			 instancia_click();
             document.getElementById('cadastro_erro').style.display = "none";
      			 $scope.serie = $scope.turma = $scope.turno = $scope.ano = '';

          }, function errorCallback(response) {
            console.log('erro');
          });
    }

    $scope.excluir_turma = function(){
    swal({   title: 'Excluir Turma',   text: 'Você tem certeza que deseja excluir?',   type: 'warning',   showCancelButton: true,   confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Sim, Excluir!',  cancelButtonText: 'Cancelar',  closeOnConfirm: false }, function() {    

    var url = 'http://localhost/sin/sin_ws/cadastra_turmas.php';
    var table = $('#tabela').DataTable();
		var dados = table.rows('.selected').data();

		var dados = {
            "funcao" : "excluir",
            "id_turma" : dados[0][0] 
        };

        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {

           if(response.data.substr(0, 6) == 'Cannot'){
            console.log('erro');
            sweetAlert(
              'Erro...',
              'Para excluir a turma, certifique-se que nenhum aluno está ligado a ela',
              'error'
            )
            return false;
           }
           swal({   title: 'Excluido com Sucesso',   type: 'success',   timer: 2500 });
             
           $('#tabela').dataTable().fnClearTable();
    			 $('#tabela').dataTable().fnDestroy();
    			 $scope.lista_turmas();
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

    	document.getElementById('id_turma').value = dados[0][0];
      document.getElementById('serie_edit').value = dados[0][1].substr(0,1);
      document.getElementById('turma_edit').value = dados[0][2];
      document.getElementById('turno_edit').value = dados[0][3];
      document.getElementById('ano_edit').value = dados[0][4];
    }

    $scope.editar_turma = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_turmas.php';
    	
      var id_turma = document.getElementById('id_turma').value;
      var serie = document.getElementById('serie_edit').value;
      var turma = document.getElementById('turma_edit').value;
      var turno = document.getElementById('turno_edit').value;
      var ano = document.getElementById('ano_edit').value;
      
      if(!serie || !turma || !turno || !ano){
        document.getElementById('edit_erro').style.display = "block";
        return false;
      }
      var dados = {
            "id_turma" : id_turma,
            "serie" : serie,
            "turma" : turma,
            "turno" : turno,
            "ano" : ano
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
             $scope.lista_turmas();
             setSelecionado(0);
             instancia_click();
          }, function errorCallback(response) {
            console.log('erro');
          });
        }
}

