 //id(#), classe(.),

var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//função .ready ela vai chamar todas as função depois que a pagina ja estiver carregada
//$(document).ready(function() {
//a ação abaixo é a mesma de $(document).ready(function() {
$(function (){	
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);

	atualizaPlacar();

	//plugin para usar no <select>
	//http://selectize.github.io/selectize.js/
	$("#usuarios").selectize({
    	create: true,
    	sortField: 'text'
	});

	//plugin para notificação
	//http://iamceege.github.io/tooltipster/
	$(".tooltip").tooltipster({
		trigger: "custom"
	});
});

function atualizaTempoInicial(tempo){
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase(){
	//função .text() - sem parametro, pegar o valor
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	//esta buscar algo por esse id tamanho-frase, ele encontra o span nesse casos
	var tamanhoFrase = $("#tamanho-frase");
	//função .text(teste) - com parametro, insere o valor
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
	//função .val() - pega os valores do input, ou text area
	//função .on() - não é necessariamente um click mas uma ação dentro de uma area
	//.on("click") - isso sim esta definido a ação de click
	//.on("input") - isso esta verificando dinamicamente o que estou digitando
	//pode usar função anonima ou uma função com nome
	// nesse caso ficar assim campo.on("input",alteraTexto());
	campo.on("input",function() {

		//função .split(" "), os paramentros que vão indica por onde ela ira separar
		//nesse caso separa por espaço
		//mas ele nesse caso ele ve espaço como forma de uma palavra então irei usar uma expressão regular
		//para melhorar
		var conteudo = campo.val();
		var qtdPalavras = conteudo.split(/\s+/).length - 1;
		var qtdCaracteres = conteudo.length;
		$("#contador-palavras").text(qtdPalavras);
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro(){
	//focus, serve para ele ter focu no campo na hora que ele começar a digitar nesse caso
	//função one, funciona apenas uma vez a função on fique verificando toda as vezes
	campo.one("focus",function(){
		var tempoRestante = $("#tempo-digitacao").text();
		//setInteval é uma função que vai ser chamada de tantos em tantos milisegundos
		//nesse caso de 1000 e 1000 milisegundos = 1 segundo
		// => isso e uma arrow function anonima, o mesmo de colocar function()
		var cronometroID = setInterval(() => {
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				clearInterval(cronometroID);
				finalizaJogo();
			}
		}, 1000);
	});
}
	
function finalizaJogo(){
	//função attr funciona, para inserir um atributo, serve tanto para pegar como para colocar
	//usando true vc esta colocando o disabled
	campo.attr("disabled",true);
	//função .css, para alterar css na pagina
	//campo.css('background-color', 'lightgray');
	//mas nesse caso vc sempre teria que verificar no codigo onde esta alterando o css
	//para ficar melhor padronizado e melhor usar a função addClass
	//que vai pegar uma classe que ja esta no arquivo css e vai colocar ela no html
	//campo.addClass('campo-desativado');
	//a função .toggleClass vai agir de forma que ela coloca e la em baixo ele tira
	//nesse caso vc não precisa ficar colocando add ou remove
	campo.toggleClass('campo-desativado');
	inserePlacar();
}

function inicializaMarcadores(){
	campo.on('input',function() {
		var frase = $(".frase").text();
		var digitado = campo.val();
		var comparavel = frase.substr(0,digitado.length);
		//função startsWith faz o mesmo que digitado == comparavel
		//A função startsWith devolve true ou false, se a frase começa com o valor digitado
		if(frase.startsWith(digitado)){
			campo.addClass('borda-verde');
			campo.removeClass('borda-vermelha');
		}else{
			campo.addClass('borda-vermelha');
			campo.removeClass('borda-verde');
		}

	});
}

//$("#botao-reiniciar").on("click", function() {
//	console.log("teste");	
//});
//.click é o mesmo .on("click"), existe tbm focus e essas mas comuns

function reiniciaJogo() {
	//quando usa false vc esta removendo o desabled
	// mas vc tbm pode usar dessa formas campo.removeAttr("disabled");
	campo.attr("disabled",false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	//função remove a classe
	//campo.removeClass('campo-desativado');
	campo.toggleClass('campo-desativado');
	campo.removeClass('borda-vermelha');
	campo.removeClass('borda-verde');
}

