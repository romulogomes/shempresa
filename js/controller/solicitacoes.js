function SolicitacoesCtrl ($scope, $rootScope, $http){
	
	var url = 'http://localhost/sin/sin_ws/';
	
	
    /*
	if(!sessionStorage.getItem('nome'))
		location.href= "../index.html"; */

	$scope.usuario = function(){
		return sessionStorage.getItem('nome');
	}

	$scope.lista_solicitacoes = function(){ 
    var t = $('#tabela').DataTable({
      "columns": [
          { "width": "40%" },
          { "width": "15%" },
          { "width": "15%" },
          { "width": "15%" },
          { "width": "15%" },],
      "info": false,
      "paging" : false
    });
    
    const dados = [
      {
        nome: "Rômulo Gomes Matos Braga",
        cpf: "60441633340",
        valor: "500",
        data: "12/02/2020",
        status: "Aguardando Resposta"
      }
    ];
    
    dados.forEach(dado => {
      t.row.add([
        dado.nome,
        dado.cpf,
        dado.valor,
        dado.data,
        dado.status,
      ]).draw();    
    });

    instancia_selecao('#tabela');
	}
  	
  	// carrega informações sobre o aluno
  $scope.infos_aluno = function(){
    
    var dados = {
        "id_aluno" : 4
    };

    $http({
        method: 'POST',
        url: url+'infos_boletim.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
        data: dados      
      }).then(function successCallback(response) {
            console.log(response.data[0]);
            $scope.aluno = response.data[0];
        }, function errorCallback(response) {
          // alert('Não foi possivel carregar os Dados');
        });
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