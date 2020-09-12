function BoletimCtrl ($scope, $rootScope, $http){
	
	var url = 'http://localhost/sin/sin_ws/';
	
	$scope.menus =  [{
					    "nome" : "Boletim",
					    "icone" : "clip-file-2",
					    "link" : "boletim.html",
					  },
					  {
					    "nome" : "Rendimento Escolar",
					    "icone" : "clip-stats",
					    "link" : "rendimento.html",
					  },
					  {
					    "nome" : "Grade Curricular",
					    "icone" : "fa fa-book",
					    "link" : "grade.html",
					  }
					];			

    /*
	if(!sessionStorage.getItem('nome'))
		location.href= "../index.html"; */

	$scope.usuario = function(){
		return sessionStorage.getItem('nome');
	}

    // busca as notas e prepara para aparecer na tabela
	$scope.lista_notas = function(){ 
      $http.get(url + 'listar_notas_aluno.php').
        success(function(data) {
     		  var dis_ja_vistas = [];
          var json = [];
          x = -1;

          for (var i = 0; i < data.length; i++) {
            var id_disciplina = data[i].id_disciplina;

            if(dis_ja_vistas.indexOf(id_disciplina) == -1){
               json[++x] = { 
                'id_disciplina' : id_disciplina,
                'nome_dis' : data[i].nome,
                'nota1' : '',
                'nota2' : '',
                'nota3' : '',
                'nota4' : ''
              };

              for (var j = 0; j < data.length; j++) {
                if(id_disciplina == data[j].id_disciplina){
                   
                   switch (data[j].bimestre) {
                    case '1'  :
                        json[x].nota1 = data[j].nota;
                        break;
                    case '2':
                        json[x].nota2 = data[j].nota;
                        break;
                    case '3':
                        json[x].nota3 = data[j].nota;
                        break;
                    case '4':
                        json[x].nota4 = data[j].nota;
                        break;
                    }               
              };
             dis_ja_vistas.push(id_disciplina);
            }   
          };
        }
        $scope.boletim = json;
        monta_tabela_notas(json);

      }).
      error(function() {
          alert('Não foi possivel carregar os Dados');
      });
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
            alert('Não foi possivel carregar os Dados');
          });
	 }

  	// monta pdf
  	$scope.gera_dados_pdf = function(){
      monta_pdf($scope.boletim, $scope.aluno.nome);                
    }


  $scope.infos_aluno();
};

function monta_tabela_notas (dados){
  var t = $('#tabela_notas').DataTable({
        "columns": [
            { "width": "40%" },
            { "width": "15%" },
            { "width": "15%" },
            { "width": "15%" },
            { "width": "15%" },],
        "info": false,
        "paging" : false
  });

  for (var i = 0; i < dados.length; i++) {
      t.row.add([
            dados[i].nome_dis,
            dados[i].nota1 ? dados[i].nota1 : '-',
            dados[i].nota2 ? dados[i].nota2 : '-',
            dados[i].nota3 ? dados[i].nota3 : '-',
            dados[i].nota4 ? dados[i].nota4 : '-',
            ]).draw();    
  };


    $('#tabela_notas tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            t.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
}

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