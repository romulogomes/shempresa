function professores_controller($scope, $http){
    $scope.selecionado = false;
    var id_escola = sessionStorage.getItem('id_escola');

    $scope.lista_professores = function(){
    	$scope.loading = true;
     	var url = 'http://localhost/sin/sin_ws/lista_professores.php?id='+id_escola;
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
		                 data[i]['id_professor'],
		                 data[i]['nome'],
		                 data[i]['endereco'],
		                 data[i]['telefone']
		            ]).draw();    
			  	}
			  	instancia_click();
		  		
		  }).
		  error(function() {
		  		alert('Não foi possivel carregar os Dados');
		  });
    }

    $scope.cadastra_professor = function(){
    	var url = 'http://localhost/sin/sin_ws/cadastra_professores.php';
      
      if(!$scope.nome || !$scope.endereco ||  !$scope.telefone){
        document.getElementById('cadastro_erro').style.display = "block";
        return false;
      }
    	var dados = {
            "nome" : $scope.nome,
            "endereco" : $scope.endereco,
            "telefone" : $scope.telefone,
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
      			 $scope.lista_professores();
      			 instancia_click();
             document.getElementById('cadastro_erro').style.display = "none";
      			 $scope.nome = $scope.endereco = $scope.telefone = '';

          }, function errorCallback(response) {
            console.log('erro');
          });
    }

    $scope.excluir_professor = function(){
    swal({   title: 'Excluir Professor',   text: 'Você tem certeza que deseja excluir?',   type: 'warning',   showCancelButton: true, cancelButtonText: 'Cancelar',  confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Sim, Excluir!',   closeOnConfirm: false }, function() {  

    var url = 'http://localhost/sin/sin_ws/cadastra_professores.php';
    var table = $('#tabela').DataTable();
		var dados = table.rows('.selected').data();

		var dados = {
            "funcao" : "excluir",
            "id_professor" : dados[0][0] 
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
    			 $scope.lista_professores();
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

    	document.getElementById('id_professor').value = dados[0][0];
      document.getElementById('nome_edit').value = dados[0][1];
    	document.getElementById('endereco_edit').value = dados[0][2];
    	document.getElementById('telefone_edit').value = dados[0][3];
    }

    $scope.editar_professor = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_professores.php';
    	var nome =      document.getElementById('nome_edit').value;
      var endereco =  document.getElementById('endereco_edit').value;
      var telefone =  document.getElementById('telefone_edit').value;
      var id_professor =  document.getElementById('id_professor').value;

      if(!nome || !endereco || !telefone || !id_professor){
        document.getElementById('edit_erro').style.display = "block";
        return false;
      }
      var dados = {
            "nome" : nome,
            "endereco" : endereco,
            "telefone" : telefone,
            "id_professor" : id_professor
      };
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             console.log(response.data);

             swal({   title: 'Professor Atualizado',   type: 'success',   timer: 2500 });
             $('#modal_editar').modal('toggle');
             $('#tabela').dataTable().fnClearTable();
             $('#tabela').dataTable().fnDestroy();
             $scope.lista_professores();
             setSelecionado(0);
             instancia_click();
          }, function errorCallback(response) {
            console.log('erro');
          });
        }
}

