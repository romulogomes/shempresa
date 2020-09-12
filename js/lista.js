var cargoselecionado; /* var para o Botão gera pdf */

function buscar_grupo( grupo){
  var t = $('#tabela').DataTable({
            paging: false,
            "columns": [
                { "width": "65%" },
                { "width": "15%" },
              ]
        });

       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var ans = JSON.parse(resposta_servidor);
           var valor_global = 0;

            for(i = 0; i < ans.length; i++){
               var descricao = ans[i].dscFuncao; 
               var total = ans[i].total;
               valor_global += total;


               t.row.add( [
                 descricao,
                 '<center>'+total+'</center>'
                
            ]).draw();        
               
            }

          document.getElementById('loading').style.display = "none";
          document.getElementById('total').innerHTML += valor_global;
      }
    }
    
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/entidade.cgtesatviosfuncionarios/"+grupo;
    xhr.open("GET", url, true);
    xhr.send();
}

function batem_ponto(){
  var t = $('#tabela_batem_ponto').DataTable();

       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var ans = JSON.parse(resposta_servidor);
           console.log(ans.length);
              
           for(i = 0; i < ans.length; i++){
               var matricula = ans[i].matricula; 
               var lotacao = ans[i].lotacao;
               var nome = ans[i].nome;
            
               t.row.add( [
                 matricula,
                 lotacao,
                 nome
              ]).draw();       
            }
               
               
            }
        
      }
    
    
    url = "http://172.29.2.30:8087/sigews/webresources/batempontobiometrico?lotacao=HGF";
    xhr.open("GET", url, true);
    xhr.send();
}

function buscar_comissionados( index ){

    if(index){
      var t = $('#tabela').DataTable({
            paging: false,
            searching: false,
            info: false,
             "columns": [
                { "width": "50%" },
                { "width": "40%" },
                { "width": "10%" },
              ]
        });
    }
    else{
      var t = $('#tabela').DataTable({
            paging: false,
             "columns": [
                { "width": "50%" },
                { "width": "40%" },
                { "width": "10%" },
              ]
        });
    }
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);
           var valor_global = 0;

            for(i = 0; i < dados.length; i++){
               var simbologia = dados[i].simbologia; 
               var tipo = dados[i].tipoChefia;
               var total = dados[i].qtde;
               valor_global += total;


               t.row.add( [
                 simbologia,
                 tipo,
                 '<center>'+total+'</center>'

               ]).draw();
              
               
            }

         document.getElementById('loading').style.display = "none";
         document.getElementById('total_comissionado').innerHTML += valor_global;
      }
    }
    
    
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/entidade.vwmcgetesqtdecargocomis/";
    xhr.open("GET", url, true);
    xhr.send();
}

function situacao_financeiro( index ){

  if(index){
      var t = $('#tabela_situacao').DataTable({
            searching: false,
            paging: false,
            info: false,
             "columns": [
                { "width": "50%" },
                { "width": "15%" },
                { "width": "35%" },
              ]
        });
  }
  else{
    var t = $('#tabela_situacao').DataTable({
             "columns": [
                { "width": "75%" },
                { "width": "12%" },
                { "width": "10%" },
              ]
        });
  }
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);
           var valor_global = 0;           
            for(i = 0; i < dados.length; i++){
               var situacao = dados[i].situacao; 
               var servidores = dados[i].servidores;
               var total = dados[i].total;
               
               var total2 = total;
               total = getMoney(total.toString());
               total = formatReal(total);
               valor_global += total2;
               
              if(situacao){
                 t.row.add( [
                   situacao,
                   '<center>'+servidores+'</center>',
                   '<span style="float:right">'+total2.formatMoney(2)+'</span>'

                 ]).draw();
               } 
               
            }

         document.getElementById('loading').style.display = "none";
         document.getElementById('total').innerHTML += ' R$ '+valor_global.formatMoney(2);
      }
    }
    
    
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/entidade.vwmcgetessituacaofinanceiro/";
    xhr.open("GET", url, true);
    xhr.send();
}


function total_por_folha( index ){
  if(index){
      var t = $('#tabela_total_folha').DataTable({
            searching: false,
            paging: false,
            info: false,
             "columns": [
                { "width": "50%" },
                { "width": "25%" },
                { "width": "20%" },
              ]
        });
  }
  else{
    var t = $('#tabela_total_folha').DataTable({
             "columns": [
                { "width": "75%" },
                { "width": "12%" },
                { "width": "10%" },
              ]
        });
  }
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);
           var valor_global = 0;

            for(i = 0; i < dados.length; i++){
               var situacao = dados[i].situacao; 
               var servidores = dados[i].servidores;
               var total = dados[i].total;

               var total2 = total;
               total = getMoney(total.toString());
               total = formatReal(total);
               valor_global += total2;
               

               if(situacao){
                 t.row.add( [
                   situacao,
                   '<center>'+servidores+'</center>',
                   '<span style="float:right">'+total2.formatMoney(2)+'</span>'

                 ]).draw();
               } 
               
            }
         document.getElementById('loading').style.display = "none";
         document.getElementById('total').innerHTML += ' R$ '+valor_global.formatMoney(2);
      }
    }    
    
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/entidade.vwmtotalporfolha";
    xhr.open("GET", url, true);
    xhr.send();
}

function buscar_vacancias( tipo, cargo){
      cargoselecionado = cargo;                  /* var para o Botão gera pdf */      
      $('#tabela_vac').DataTable().destroy();
       var t = $('#tabela_vac').DataTable({
             "columns": [
                { "width": "8%" },
                { "width": "25%" },
                { "width": "25%" },
                { "width": "13%" },
              ]
        });

       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);

            for(i = 0; i < dados.length; i++){
               var matricula = dados[i].matricula; 
               var nome = dados[i].nome;
               var cargo = dados[i].cargo;
               var lotacao = dados[i].lotacao;
               
               t.row.add( [
                   matricula,
                   nome,
                   cargo,
                   lotacao
                 ]).draw();               
            }           

         document.getElementById('loading').style.display = "none";
      }
    }
    
    if(tipo == 1)
      url = "http://extranet.saude.ce.gov.br/sigews/webresources/vacancias/cargo/"+cargo;
    else
      if(tipo == 2)
        url = "http://extranet.saude.ce.gov.br/sigews/webresources/vacancias/lotacao/"+cargo;
      else
        url = "http://172.29.2.30:8087/sigews/webresources/telefoniacustos/unidade/"+cargo;

    xhr.open("GET", url, true);
    xhr.send();
}

function buscar_custos(tipo, cargo){
  var cargo2=  encodeURIComponent(cargo);
      location.href = "#ancora";
      $('#tabela_custos').dataTable().fnDestroy();
      $('#tabela_custos').dataTable().fnClearTable();
      
      var t = $('#tabela_custos').DataTable();

       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange=function(){
    
        if (xhr.readyState == 4 && xhr.status == 200) {
           var resposta_servidor = xhr.responseText;
           var dados = JSON.parse(resposta_servidor);

           dados = ordena_dados(dados);

           gera_custos_telefonia(dados);


            for(i = 0; i < dados.length; i++){
               var unidade = dados[i].unidade; 
               var competencia = dados[i].competencia;
               
                if(dados[i].valor)
                  var valor = dados[i].valor.formatMoney(2);
                else
                  valor = 'NÃO INFORMADO';

               
               t.row.add( [
                   unidade,
                   competencia,
                   valor
                 ]).draw();               
            }           
            $('#tabela_custos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table = $('#tabela_custos').DataTable();
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            } });
            

      }
    }

     url = "http://172.29.2.30:8087/sigews/webresources/telefoniacustos/unidade/"+cargo2;
    xhr.open("GET", url, true);
    xhr.send();
}

function getMoney( str )
{
        return parseInt( str.replace(/[\D]+/g,'') );
}

function formatReal( int )
{
    var tmp = int+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    if( tmp.length > 10 )  
            tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2})$/g,'.$1.$2,$3');
    return tmp;
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };


function dateToData( data ){
  var split = data.split('-');
  var data_retorno = split[1]+'/'+split[0];
  return data_retorno;
}

function ordena_dados( dados){
  var j = 1;
  var array = [];
  
  for(var i = 0; i < dados.length; i++){
     dados[i].competencia = dateToData(dados[i].competencia);
  }
   
  for(j = 1; j <= dados.length; j++){
    for(i = 0; i < dados.length; i++){
      var split = dados[i].competencia.split('/');
      split = split[0];

      if(split == j){
        array.push(dados[i]);
        console.log(dados[i].competencia);
        continue;
      }
    }
  }

 return array;
  
  
  
  
  
}