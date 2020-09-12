function gera_evolucao_pagamento(){

	var barChartData = {
        labels : ["2006"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : [189.533]
            }
        ]

    }
   	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        
        if (xhr.readyState == 4 && xhr.status == 200) {
          var ctx = document.getElementById("grafico2").getContext("2d");
	        window.myBar = new Chart(ctx).Bar(barChartData, {
	            responsive : true
	      });

	      var dados = JSON.parse(xhr.responseText);
	      for(var i = 1; i < dados.length; i++){
          if(dados[i]['competencia'] == '2008'){
            myBar.addData([252.738], '2008');
          }
          
		      else{
            var ano = dados[i]['competencia'];
  		      var valor = dados[i]['total'];
            valor = getMoney(valor.toString());
            valor = formatReal(parseFloat(valor));
            valor = parseFloat(parseFloat(valor));
            console.log(valor);
            
		        myBar.addData([valor], ano);
          }
		   }
	      //myBar.removeData();
        }
    }
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/cgtespagamentoanual";
    xhr.open("GET", url, true);
    xhr.send();
}

function grafico_ponto(){
  var data = {
    labels: ["January", "February"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(66, 149, 255, 0.44)",
            strokeColor: "rgba(66, 149, 255, 0.44)",
            highlightFill: "rgba(66, 149, 255, 0.44)",
            highlightStroke: "rgba(66, 149, 255, 0.44)",
            data: [65, 59]
        },
        {
            label: "My Second dataset",
            fillColor: "red",
            strokeColor: "red",
            highlightFill: "red",
            highlightStroke: "red",
            data: [28, 48]
        }
    ]
};

 var ctx = document.getElementById("grafico").getContext("2d");
          window.myBar = new Chart(ctx).Bar(data, {
              responsive : true
        });

 document.getElementById('grafico_container').innerHTML = '';
document.getElementById('grafico_container').innerHTML = '<canvas id="grafico"><canvas>';

  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        
        if (xhr.readyState == 4 && xhr.status == 200) {
          var ctx = document.getElementById("grafico").getContext("2d");
          window.myBar = new Chart(ctx).Bar(data, {
              responsive : true,
              animationSteps : 10,
        });

        var dados = JSON.parse(xhr.responseText);
        
        for(var i = 0; i < dados.length; i++){

          console.log(dados[i].naobatem);

          var valor1 = dados[i].batem;
          var valor2 = dados[i].naobatem;
          var nome = dados[i].sglorg;

           myBar.addData([valor1, valor2], nome);
        }
        
        myBar.removeData();
        myBar.removeData();
        }
    }
    url = "http://172.29.2.30:8087/sigews/webresources/percbatempontobiometrico";
    xhr.open("GET", url, true);
    xhr.send();



 

}

function gera_ascensao_funcional(){

  var barChartData = {
        labels : ["2006"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : [16.222]
            }
        ]

    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        
        if (xhr.readyState == 4 && xhr.status == 200) {
          var ctx = document.getElementById("grafico").getContext("2d");
          window.myBar = new Chart(ctx).Bar(barChartData, {
              responsive : true,
              animationSteps : 10
        });

        var dados = JSON.parse(xhr.responseText);
        for(var i = 1; i < dados.length; i++){
          var ano = dados[i]['ano'];
          var valor = dados[i]['vlrVerba'];
          valor = getMoney(valor.toString());
          valor = formatReal(parseFloat(valor));
          valor = parseFloat(parseFloat(valor));
          myBar.addData([valor], ano);
       }
        //myBar.removeData();
        }
    }
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/entidade.sinteticodifascensao/";
    xhr.open("GET", url, true);
    xhr.send();
}

function gera_data( cargo, id ){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
          dados = JSON.parse(xhr.responseText);
          var total = [];
          var ano = [];
          for (var i = 0; i < dados.length; i++) {
            total[i] = dados[i].total;
            ano[i] = dados[i].periodo;
          }
          grafico_evolucao_ses(total, ano, id);
        }
    }
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/entidade.cgtesevolucaogruposes/"+cargo;
    xhr.open("GET", url, true);
    xhr.send();
}

function gera_custos_telefonia( dados ){
    
    document.getElementById('grafico_container').innerHTML = '';
    var barChartData = {
        labels : ["07/2015"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : [189.533]
            }
        ]
    }
     
     document.getElementById('grafico_container').innerHTML = '<canvas id="grafico"><canvas>';
     
     var ctx = document.getElementById("grafico").getContext("2d");
          window.myBar = new Chart(ctx).Bar(barChartData, {
              responsive : true
        });

           for(var i = 0; i < dados.length; i++){

              var valor;
              if( dados[i].valor)
                valor = dados[i].valor;
              else
                valor = 0;

              var competencia = dados[i].competencia;
              myBar.addData([valor], competencia);
              myBar.update();
          }
           
           myBar.removeData();

}

function grafico_evolucao_ses( dados, ano, id ){
    var grafico = 'grafico'+id;
    var canvas = 'canvas'+id;
    document.getElementById(grafico).innerHTML = '<canvas id='+canvas+'></canvas>';

  var lineChartData = {
            labels : ["2003", "2004"],
            datasets : [
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [2, 5]
                },
            ]
        }
           //document.getElementById('loading').style.display = "none";
           var ctx = document.getElementById(canvas).getContext("2d");
           window.myLine = new Chart(ctx).Line(lineChartData, {
               responsive: true,
               animationSteps : 10,
           });

          for(var i = 0; i < dados.length; i++){
            myLine.addData([dados[i]], ano[i]);
          }
           

          myLine.removeData();
          myLine.removeData();
}

function graf_vale_alimentacao_qtd( grupo){

  var barChartData = {
        labels : ["Minha Média", "Média da Turma"],
        datasets : [
            {   fillColor : "rgba(151,187,205,0.5)", strokeColor : "rgba(151,187,205,0.8)", highlightFill : "rgba(151,187,205,0.75)", 
                highlightStroke : "rgba(151,187,205,1)",
                data : [Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1)]
            }
        ]
    }
    var ctx = document.getElementById("grafico").getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true
          });

  var barChartData = {
        labels : ["Minha Média", "Média da Turma"],
        datasets : [
            {   fillColor : "rgba(240, 110, 110 ,0.5)", strokeColor : "rgba(240, 110, 110,0.8)", highlightFill : "rgba(240, 110, 110, 0.75)", 
                highlightStroke : "rgba(240, 110, 110,1)",
                data : [Math.floor(Math.random() * 10+1), Math.floor(Math.random() * 10+1)]
            }
        ]

    }

    var ctx = document.getElementById("grafico2").getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true
          });
   
   var barChartData = {
        labels : ["Minha Média", "Média da Turma"],
        datasets : [
            {   fillColor : "rgba(245, 228, 98 ,0.5)", strokeColor : "rgba(245, 228, 98,0.8)", highlightFill : "rgba(245, 228, 98, 0.75)", 
                highlightStroke : "rgba(245, 228, 98,1)",
                data : [Math.floor(Math.random() * 10+1), Math.floor(Math.random() * 10+1)]
            }
        ]

    }
    var ctx = document.getElementById("grafico3").getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true
          });
  
  var barChartData = {
        labels : ["Minha Média", "Média da Turma"],
        datasets : [
            {   fillColor : "rgba(123, 245, 98 ,0.5)", strokeColor : "rgba(123, 245, 98,0.8)", highlightFill : "rgba(123, 245, 98, 0.75)", 
                highlightStroke : "rgba(245, 228, 98,1)",
                data : [Math.floor(Math.random() * 10+1), Math.floor(Math.random() * 10+1)]
            }
        ]

    }
    var ctx = document.getElementById("grafico4").getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true
          });

  var barChartData = {
        labels : ["Minha Média", "Média da Turma"],
        datasets : [
            {   fillColor : "rgba(240, 252, 109 ,0.5)", strokeColor : "rgba(240, 252, 109,0.8)", highlightFill : "rgba(240, 252, 109, 0.75)", 
                highlightStroke : "rgba(240, 252, 109,1)",
                data : [Math.floor(Math.random() * 10+1), Math.floor(Math.random() * 10+1)]
            }
        ]
    }
    var ctx = document.getElementById("grafico5").getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true
          });
  var barChartData = {
        labels : ["Minha Média", "Média da Turma"],
        datasets : [
            {   fillColor : "rgba(137, 109, 252 ,0.5)", strokeColor : "rgba(137, 109, 252,0.8)", highlightFill : "rgba(137, 109, 252, 0.75)", 
                highlightStroke : "rgba(137, 109, 252,1)",
                data : [Math.floor(Math.random() * 10+1), Math.floor(Math.random() * 10+1)]
            }
        ]
    }
    var ctx = document.getElementById("grafico6").getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true
          });
}
