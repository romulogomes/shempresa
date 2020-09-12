function aluno_controller($scope, $http){
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
            var id = data[i]['id_turma'];
            var serie = data[i]['serie'];
            var turma = data[i]['turma'];
            var turno = data[i]['turno'];
            var ano = data[i]['ano'];

            t.row.add( [
                     id,
                     serie + 'º',
                     turma,
                     turno,
                     ano,
                     '<button class="btn btn-xs btn-primary" onclick="setTela('+id+','+serie+',\''+turma+'\',\''+turno+'\','+ano+')"> Acessar Turma <i class="fa fa-arrow-right"></i></button>'
                ]).draw();    
          }
          instancia_click();
      }).
      error(function() {
          alert('Não foi possivel carregar os Dados');
      });
    }

    $scope.excluir_aluno = function(){
    	swal({   title: 'Excluir?',   text: 'Você tem certeza que deseja excluir esse Aluno?',  type: 'warning', cancelButtonText: 'Cancelar',  showCancelButton: true,   confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Sim, Excluir!',   closeOnConfirm: false }, function() {  
    
    var url = 'http://localhost/sin/sin_ws/cadastra_alunos.php';
    
    var table = $('#tabela_listaaluno').DataTable();
		var dados = table.rows('.selected').data();
    var turma = document.getElementById('id_turma').innerHTML;

		var dados = {
            "funcao" : "excluir",
            "id_aluno" : dados[0][0] 
        };

        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             console.log(response.data);
             swal({   title: 'Excluido com Sucesso',   type: 'success',   timer: 2500 });
             setSelecionado(0);
             carrega_infos_turma(turma);
          }, function errorCallback(response) {
            console.log('erro');
          });

        });
    }

    $scope.lista_disciplinas = function(){
      $scope.disciplinas = [];
      var url = 'http://localhost/sin/sin_ws/lista_disciplinas.php?id='+id_escola;
      $http.get(url).
        success(function(data) {
          $scope.loading = false;
          if(data.erro)
            return false;
          
          for(var i = 0; i < data.length; i++){
            $scope.disciplinas.push( {
                    "id" : data[i]['id_disciplina'],
                    "nome": data[i]['nome']
                });
          }
          instancia_click();
      }).
      error(function() {
          alert('Não foi possivel carregar os Dados');
      });
    }

    $scope.cadastra_aluno = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_alunos.php';
      
      var turma = document.getElementById('id_turma').innerHTML;
      var data_nascimento = document.getElementById('data_nascimento').value;
      var telefone = document.getElementById('telefone').value

      if(!$scope.nome || !$scope.nis || !$scope.endereco || !data_nascimento){
        document.getElementById('cadastro_erro').style.display = "block";
        return false;
      }
      var dados = {
            "nome" : $scope.nome,
            "nis" : $scope.nis,
            "endereco" : $scope.endereco,
            "data_nascimento" : data_nascimento,
            "telefone" : telefone,
            "turma_fk" : turma
        };
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             $('#modal_cadastrar').modal('toggle');
             swal({ title: 'Cadastrado com Sucesso',   type: 'success',   timer: 2500 });
             carrega_infos_turma(turma);
             setSelecionado(0);
             document.getElementById('cadastro_erro').style.display = "none";
             $scope.nome = $scope.nis = $scope.endereco = $scope.data_nascimento = $scope.telefone = '';
          }, function errorCallback(response) {
            console.log(response);
          });
    }

   $scope.monta_edit = function(){
      var table = $('#tabela_listaaluno').DataTable();
      var dados = table.rows('.selected').data();

      document.getElementById('id_aluno').value = dados[0][0];
      document.getElementById('aluno_edit').innerHTML = dados[0][1];
      document.getElementById('nome_edit').value = dados[0][1];
      document.getElementById('nis_edit').value = dados[0][2];
      document.getElementById('endereco_edit').value = dados[0][3];
      document.getElementById('telefone_edit').value = dados[0][4];
      document.getElementById('data_nascimento_edit').value = dados[0][5];
      
    }

    $scope.editar_aluno = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_alunos.php';
    	
      var nome = document.getElementById('nome_edit').value;
      var nis = document.getElementById('nis_edit').value;
      var endereco = document.getElementById('endereco_edit').value;
      var telefone = document.getElementById('telefone_edit').value;
      var data_nascimento = document.getElementById('data_nascimento_edit').value;
      var turma = document.getElementById('id_turma').innerHTML;
      id_aluno = document.getElementById('id_aluno').value;

      if(!nome || !nis || !endereco || !telefone || !data_nascimento ){
        document.getElementById('edit_erro').style.display = "block";
        return false;
      }
      var dados = {
            "id_aluno" : id_aluno,
            "nome" : nome,
            "nis" : nis,
            "endereco" : endereco,
            "telefone" : telefone,
            "data_nascimento" : data_nascimento,
      };
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             swal({   title: 'Aluno Atualizado com Sucesso',   type: 'success',   timer: 2500 });
             carrega_infos_turma(turma);
             $('#modal_editar').modal('toggle');
             setSelecionado(0);
             document.getElementById('cadastro_erro').style.display = "none";
          }, function errorCallback(response) {
            console.log('erro');
          });
        }

}

function carrega_infos_turma( id, serie, turma, turno, ano){
  document.getElementById('id_turma').innerHTML = id;
  if(serie)
    document.getElementById('infos').innerHTML = 'Serie: <b>'+serie + 'º</b> / Turma: <b>'+turma+'</b> / Turno: <b>'+turno+'</b> / Ano: <b>'+ano+'</b>';
  document.getElementById('box_tabela_listaaluno').innerHTML = '<table id="tabela_listaaluno" class="tabela display" cellspacing="0"> <thead> <tr> <th>Idenficador</th> <th>Nome</th> <th>NIS</th> <th>Endereço</th> <th>Telefone</th> <th>Data de Nascimento</th> </tr> </thead> </table>'; 
       var t = $('#tabela_listaaluno').DataTable();
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var ans = JSON.parse(resposta_servidor);

            for(i = 0; i < ans.length; i++){
               var id_aluno = ans[i].id_aluno; 
               var nome = ans[i].nome; 
               var nis = ans[i].nis; 
               var endereco = ans[i].endereco;
               var telefone = ans[i].telefone;
               var data_nascimento = ans[i].data_nascimento;

               t.row.add( [
                 id_aluno,
                 nome,
                 nis,
                 endereco,
                 telefone,
                 data_nascimento
                ]).draw();
             }
              var tabela = '#tabela_listaaluno';
              var tbody = tabela.concat(' tbody');
              var tr = tabela.concat(' tr.selected');

              $(tbody).on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                          $(this).removeClass('selected'); 
                          setSelecionado(0);
                        } else {
                          $('#tabela_listaaluno tr.selected').removeClass('selected'); 
                          setSelecionado(1);
                          $(this).addClass('selected');
                          } });

          var column = t.column( 0 );
          column.visible( ! column.visible() );
 
      }
    }
    url = "http://localhost/sin/sin_ws/lista_alunos.php?id="+id;
    xhr.open("GET", url, true);
    xhr.send();
}