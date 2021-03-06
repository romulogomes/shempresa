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
               
               total = getMoney(total.toString());
               valor_global += total;
               total = formatReal(total);

               if(situacao){
                 t.row.add( [
                   situacao,
                   '<center>'+servidores+'</center>',
                   '<span style="float:right">R$ '+total+'</span>'

                 ]).draw();
               } 
               
            }

         valor_global = formatReal(valor_global);
         document.getElementById('loading').style.display = "none";
         document.getElementById('total').innerHTML += valor_global;
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
               
               total = getMoney(total.toString());
               valor_global += total;
               total = formatReal(total);

               if(situacao){
                 t.row.add( [
                   situacao,
                   '<center>'+servidores+'</center>',
                   '<span style="float:right">R$ '+total+'</span>'

                 ]).draw();
               } 
               
            }
         valor_global = formatReal(valor_global);
         document.getElementById('loading').style.display = "none";
         document.getElementById('total').innerHTML += valor_global;
      }
    }
    
    
    url = "http://extranet.saude.ce.gov.br/sigews/webresources/entidade.vwmtotalporfolha";
    xhr.open("GET", url, true);
    xhr.send();
}

function buscar_vacancias( tipo, cargo){
      $('#tabela_vac').dataTable().fnClearTable();
       t = $('#tabela_vac').DataTable();

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
      url = "http://extranet.saude.ce.gov.br/sigews/webresources/vacancias/lotacao/"+cargo;
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