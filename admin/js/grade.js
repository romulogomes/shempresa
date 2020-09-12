function grade_controller($scope, $http){
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

    $scope.excluir_grade = function(){
    	swal({   title: 'Excluir?',   text: 'Você tem certeza que deseja excluir essa disciplina?',   type: 'warning', cancelButtonText: 'Cancelar',  showCancelButton: true,   confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Sim, Excluir!',   closeOnConfirm: false }, function() {  
    
    var url = 'http://localhost/sin/sin_ws/cadastra_grade.php';
    
    var table = $('#tabela_listagrade').DataTable();
		var dados = table.rows('.selected').data();
    var turma = document.getElementById('id_turma').innerHTML;

		var dados = {
            "funcao" : "excluir",
            "id_grade" : dados[0][0] 
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

    $scope.cadastra_grade = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_grade.php';
      var turma = document.getElementById('id_turma').innerHTML;
      if(!$scope.diciplina){
        document.getElementById('cadastro_erro').style.display = "block";
        return false;
      }
      if(!$scope.conteudo_prog){
        $scope.conteudo_prog = '';
      }
      var dados = {
            "disciplina" : $scope.diciplina,
            "conteudo" : $scope.conteudo_prog,
            "turma" : turma
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
             $scope.diciplina = $scope.conteudo_prog =  '';
          }, function errorCallback(response) {
            console.log('erro');
          });
    }

   $scope.monta_edit = function(){
      var table = $('#tabela_listagrade').DataTable();
      var dados = table.rows('.selected').data();

      document.getElementById('id_grade').value = dados[0][0];
      document.getElementById('conteudo_prog_edit').value = dados[0][2];
      document.getElementById('disciplina_edit').innerHTML = dados[0][1];
    }

    $scope.editar_grade = function(){
      var url = 'http://localhost/sin/sin_ws/cadastra_grade.php';
    	
      var id_grade = document.getElementById('id_grade').value;
      var conteudo_prog_edit = document.getElementById('conteudo_prog_edit').value;
       var turma = document.getElementById('id_turma').innerHTML;

      if(!conteudo_prog_edit){
        document.getElementById('edit_erro').style.display = "block";
        return false;
      }
      var dados = {
            "id_grade" : id_grade,
            "conteudo" : conteudo_prog_edit
      };
        $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, transformRequest: function(obj) {var str = [];for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); }, data: dados
        }).then(function successCallback(response) {
             swal({   title: 'Grade Atualizada com Sucesso',   type: 'success',   timer: 2500 });
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
  document.getElementById('box_tabela_listagrade').innerHTML = '<table id="tabela_listagrade" class="tabela display" cellspacing="0"><thead><tr><th>Idenficador</th><th>Disciplina</th><th>Conteúdo Programático</th></tr></thead></table>';
  var t = $('#tabela_listagrade').DataTable({
            "columns": [
                { "width": "10%" },
                { "width": "35%" },
                { "width": "55%" },
              ]
        });
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var ans = JSON.parse(resposta_servidor);

            for(i = 0; i < ans.length; i++){
               var id_grade = ans[i].id_grade; 
               var nome = ans[i].nome; 
               var descricao = ans[i].descricao;

               t.row.add( [
                 id_grade,
                 nome,
                 descricao
                ]).draw();
             }
             var tabela = '#tabela_listagrade';
              var tbody = tabela.concat(' tbody');
              var tr = tabela.concat(' tr.selected');

              $(tbody).on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                          $(this).removeClass('selected'); 
                          setSelecionado(0);
                        } else {
                          $('#tabela_listagrade tr.selected').removeClass('selected'); 
                          setSelecionado(1);
                          $(this).addClass('selected');
                          } });

      }
    }
    url = "http://localhost/sin/sin_ws/lista_grade.php?id="+id;
    xhr.open("GET", url, true);
    xhr.send();
}