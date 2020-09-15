function FuncionariosCtrl ($scope, $rootScope, $http){
	
	var url = 'https://sheltered-reef-35315.herokuapp.com/';
	
	
    /*
	if(!sessionStorage.getItem('nome'))
		location.href= "../index.html"; */

	$scope.usuario = function(){
		return sessionStorage.getItem('nome');
	}

	$scope.lista_solicitacoes = function(){ 
    $scope.loading = true;
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
      url: url+'empregados',     
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
    

    instancia_selecao('#tabela');
	}
  	
  	// carrega informações sobre o aluno
  $scope.infos_aluno = function(){
    
    var dados = {
        "id_aluno" : 4
    };

    
  }

  	// monta pdf
  $scope.gera_dados_pdf = function(){
    monta_pdf($scope.boletim, $scope.aluno.nome);                
  }


  $scope.infos_aluno();
};

function monta_pdf( dados, aluno ){
    var columns = [
        {title: "Disciplinas", key: "nome_dis"},
        {title: "1º Bimestre", key: "nota1"},
        {title: "2º Bimestre", key: "nota2"},
        {title: "3º Bimestre", key: "nota3"},
        {title: "4º Bimestre", key: "nota4"}
        ];
        var documento = gerarPDF(dados, columns, "", "Aluno: "+ aluno, "Boletim", "p", "","total");
        /* dados, columns, autor, solicitante, titulo, orientacao p ou L, limitperpage */
        documento.save("boletim.pdf");

} 