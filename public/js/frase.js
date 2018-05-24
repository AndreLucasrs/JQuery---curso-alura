$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria () {
	$("#spinner").show();

	//$.get() vai buscar na url passa um json de frases
	//se de certo ele vai execeturar a função trocaFraseAleatoria
	//senão ele vai chamar a função .fail()
	//função .always() sempre vai executar o que vc passar pra ela
	//always para invocar um código sempre (erro ou sucesso) após da requisição AJAX
	$.get("http://localhost:3000/frases",trocaFraseAleatoria)
	.fail(function(){
		$("#erro").show();
		setTimeout(() => {
		  $("#erro").hide();
		}, 2000)
	})
	.always(function(){
		$("#spinner").hide();
	});
}

function trocaFraseAleatoria(data){
	var frase = $(".frase");
	//função .Matg.random() gera numero aleatorio * data.length ta gerando entre 0 e o tamanho do array
	//e a função Math.floor() ta arrendondando esse valor
	var numeroAleatorio = Math.floor(Math.random() * data.length);
	frase.text(data[numeroAleatorio].texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo)
}


function buscaFrase(){
	$("#spinner").show();
	var fraseId = $("#frase-id").val();
	var dados = {id : fraseId};
	//buscando uma frase em especifico, dados é o objeto nesse caso é o parametro que ta sendo buscados
	$.get("http://localhost:3000/frases",dados,trocaFrase)
	.fail(function(){
		$("#erro").show();
		setTimeout(() => {
		  $("#erro").hide();
		}, 2000)
	})
	.always(function(){
		$("#spinner").hide();
	});
}

function trocaFrase(data){
	var frase = $(".frase");
	frase.text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo)
}