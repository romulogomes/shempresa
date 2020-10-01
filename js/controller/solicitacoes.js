function SolicitacoesCtrl ($scope, $rootScope, $http){
 
  $scope.mes_ano = "2020-10";

	$scope.usuario = function(){
		return sessionStorage.getItem('nome');
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
    
    const mes_ano = `${$scope.mes_ano.substring(5)}/${$scope.mes_ano.substring(0, 4)}`;
    $http({
      method: 'POST',
      url: URL+'solicitacoes_por_mes_ano',
      data: { mes_ano: mes_ano }
    }).then(function successCallback(response) {
        console.log(response.data);
        response.data.forEach(dado => 
          t.row.add([
            dado.id,
            dado.nome,
            dado.cpf || "",
            dado.valor || "",
            dado.data_da_solicitacao || "",
            dado.status || "",
          ]).draw());
          $scope.loading = false;
      }, function errorCallback(response) {
        alert('Não foi possivel carregar os Dados');
      });
    
    instancia_click();
  }
  
  $scope.alterar_status = function(status){
    $scope.loading = true;
    var table = $('#tabela').DataTable();
    var dados = table.rows('.selected').data();
    
    $http({
      method: 'POST',
      url: URL+'solicitacao/alterar_status',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, 
      data: {
        id: dados[0][0],
        status: status
      }
    }).then(function successCallback(response) {
      swal({ title: 'Solicitação atualizada com sucesso!', type: 'success', timer: 2500 });
      $scope.listar();
      setSelecionado(0);
      $scope.loading = false;
    }, function errorCallback(response) {
      alert('Erro '+ response.data);
    });
  }

  // monta pdf
  $scope.gera_dados_pdf = function(){
    monta_pdf($scope.boletim, $scope.aluno.nome);                
  }

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