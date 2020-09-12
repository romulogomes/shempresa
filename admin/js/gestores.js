function gestores_controller($scope, $http){
    $scope.selecionado = false;
    var id_escola = sessionStorage.getItem('id_escola');

    $scope.lista_gestores = function(){
    	$scope.loading = true;
    
     	var url = 'http://localhost/sin/sin_ws/lista_gestores.php?id='+id_escola;
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
		                 data[i]['id_gestor'],
		                 data[i]['nome'],
		                 data[i]['endereco'],
		                 data[i]['telefone'],
		                 data[i]['login']
		            ]).draw();    
			  	}
			  	instancia_click();
		  		
		  }).
		  error(function() {
		  		alert('Não foi possivel carregar os Dados');
		  });
    }

    $scope.cadastra_gestor = function(){
    	var url = 'http://localhost/sin/sin_ws/cadastra_gestores.php';
      
      if(!$scope.nome || !$scope.endereco || !$scope.senha || !$scope.telefone || !$scope.login || !$scope.senha){
        document.getElementById('cadastro_erro').style.display = "block";
        return false;
      }
      var senha = Base64.encode($scope.senha);
    	var dados = {
            "nome" : $scope.nome,
            "endereco" : $scope.endereco,
            "telefone" : $scope.telefone,
            "login" : $scope.login,
            "senha" : senha,
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
      			 $scope.lista_gestores();
      			 instancia_click();
             document.getElementById('cadastro_erro').style.display = "none";
      			 $scope.nome = $scope.endereco = $scope.telefone = $scope.login = $scope.senha = '';

          }, function errorCallback(response) {
            console.log('erro');
          });
    }

    $scope.excluir_gestor = function(){
    	swal({   title: 'Excluir Gestor?',   text: 'Você tem certeza que deseja excluir o gestor?',   type: 'warning', cancelButtonText: 'Cancelar',  showCancelButton: true,   confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Sim, Excluir Gestor!',   closeOnConfirm: false }, function() {  
    var url2 = 'http://localhost/sin/sin_ws/cadastra_professores.php';
    var url = 'http://localhost/sin/sin_ws/cadastra_gestores.php';
    var table = $('#tabela').DataTable();
		var dados = table.rows('.selected').data();

		var dados = {
            "funcao" : "excluir",
            "id_gestor" : dados[0][0] 
        };

        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             console.log(response.data);
             swal({   title: 'Gestor Excluido com Sucesso',   type: 'success',   timer: 2500 });
             
           $('#tabela').dataTable().fnClearTable();
    			 $('#tabela').dataTable().fnDestroy();
    			 $scope.lista_gestores();
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

    	document.getElementById('id_gestor').value = dados[0][0];
      document.getElementById('nome_edit').value = dados[0][1];
    	document.getElementById('endereco_edit').value = dados[0][2];
    	document.getElementById('telefone_edit').value = dados[0][3];
    	document.getElementById('login_edit').value = dados[0][4];
    }

    $scope.editar_gestor = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_gestores.php';
    	var nome =     document.getElementById('nome_edit').value;
      var endereco = document.getElementById('endereco_edit').value;
      var telefone = document.getElementById('telefone_edit').value;
      var login =    document.getElementById('login_edit').value;
      var id_gestor =    document.getElementById('id_gestor').value;

      if(!nome || !endereco || !telefone || !login || !id_gestor){
        document.getElementById('edit_erro').style.display = "block";
        return false;
      }
      var dados = {
            "nome" : nome,
            "endereco" : endereco,
            "telefone" : telefone,
            "login" : login,
            "id_gestor" : id_gestor
      };
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             console.log(response.data);

             swal({   title: 'Gestor Atualizado com Sucesso',   type: 'success',   timer: 2500 });
             $('#modal_editar').modal('toggle');
             $('#tabela').dataTable().fnClearTable();
             $('#tabela').dataTable().fnDestroy();
             $scope.lista_gestores();
             setSelecionado(0);
             instancia_click();
          }, function errorCallback(response) {
            console.log('erro');
          });
        }
}

