function setSelecionado( selecionado ){
	if(selecionado){
		document.getElementById('btn_editar').disabled= false;
		document.getElementById('btn_excluir').disabled= false;
	}
	else{
	  document.getElementById('btn_editar').disabled= true;
		document.getElementById('btn_excluir').disabled= true;
	}
}

function instancia_selecao( tabela ){
  var tabela = tabela;
  var tbody = tabela.concat(' tbody');
  var tr = tabela.concat(' tr.selected');

	$(tbody).on('click', 'tr', function () {
			  		if ($(this).hasClass('selected')) {
			  			$(this).removeClass('selected'); 
			  			setSelecionado(0);
			  		} else {
			  			$(tabela+' tr.selected').removeClass('selected'); 
			  			$(this).addClass('selected');
							setSelecionado(1);
			  			} });
		  	
}

function instancia_click(){
  var tabela = '#tabela';
  var tbody = tabela.concat(' tbody');
  var tr = tabela.concat(' tr.selected');

	$(tbody).on('click', 'tr', function () {
			  		if ($(this).hasClass('selected')) {
			  			$(this).removeClass('selected'); 
			  			setSelecionado(0);
			  		} else {
			  			$('#tabela tr.selected').removeClass('selected'); 
							$(this).addClass('selected');
							setSelecionado(1);
			  			} });
		  	
}

function valorFormatado(valor) {
	return valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
}