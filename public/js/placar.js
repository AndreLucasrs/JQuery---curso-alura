$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sicronizaPlacar);

function inserePlacar(){
	//função .find() ele vai em busca de nós dentro do html
	var corpoTabela = $(".placar").find("tbody");
	var usuario = $("#usuarios").val();
	var numeroPalavras = $("#contador-palavras").text();
	//var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;

	//pode ser feito para criar um html na pagina assim
	//mas dessa forma quando tentarmos remover ele não da certo pq e uma string
	//var linha = "<tr>" +
	//				"<td>"+ usuario +"</td>" +
	//				"<td>"+ numeroPalavras +"</td>" +
	//				"<td>"+ botaoRemover +"</td>" +
	//			"</tr>";

	//chamar a função que vai criar uma nova linha como objeto html e assim ta a opção de remover
	var linha = novaLinha(usuario,numeroPalavras);

	linha.find(".botao-remover").click(removeLinha);

	//função .append(), serve para vc adicionar html
	//vai adicionar depois
	//se quiser adicionar antes usa .prepend()
	corpoTabela.prepend(linha);		
	$(".placar").slideDown(600);
	scrollPlacar();		
	
}

function scrollPlacar(){
	//função .offset(), te da a posição de onde esta aquilo que vc esta procurando
	//.offset().top e se eu usar assim vai dizer aonde ta aquilo que eu busco em relação ao topo, a distancia
	var posicaoPlacar = $(".placar").offset().top;

    $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario,numeroPalavras){

	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(numeroPalavras);
	var colunaRemover = $("<td>");
	var link = $("<a>").addClass('botao-remover').attr("href","#");
	var icone = $("<i>").addClass('small').addClass('material-icons').text("delete");

	link.append(icone);
	colunaRemover.append(link);
	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;

}

function removeLinha(){
	//this quer dizer o elemento atual
	// Para acessarmos um elemento acima do elemento selecionado com jQuery,
	//um elemento pai, temos a função .parent() do Javascript
	//mas como queremos remover toda a linha vamos usar 2 vezes
	event.preventDefault();
	//função .remove() vai remover o item,
	//podemos usar o .fadeOut() para ter uma animação de remover, mas ele não remove apenas colocar
	//display none, existe o .fadeIn() para aparecer e existe o .fadeToggle para sumir e aparecer
	var linha = $(this).parent().parent();
	linha.fadeOut(1000);
	//faz o fadeOut em 1000 milisegundo e depois disso o setTimout vai entrar e vai remover a linha de fato
	setTimeout(() => {
	  linha.remove();
	}, 1000);
}

function mostraPlacar(){
	//função .show() vai mostrar o placar e se vc quiser tirar vc usar .hide() ele esconde
	//a função .toggle() ele vai adicionar e remover quando clicar
	//a função .slideDown(), ele vai mostrar ao poucos sendo criado e da para vc colocar o tempo
	// a função para a animação que esta fazendo e ja começa uma nova
	$(".placar").stop().slideToggle(600);
}

function sicronizaPlacar(){
	var placar = [];
	//pega todas tr que são filha de tbody
	var linhas = $("tbody > tr");
	//função .each() é um foreach e vai interiar linha a linha do array
	linhas.each(function() {
		//busco a linha por this, this é um elemendo do html quando coloco isso $(this),
		//estou dando a possibilidade de ele usar funções do jquery nesse caso
		//td:nth-child(1), estou buscando o primeiro filho do tr
		var usuario = $(this).find("td:nth-child(1)").text();
		var palavra = $(this).find("td:nth-child(2)").text();

		var score = {
			usuario: usuario,
			pontos: palavra
		};

		placar.push(score);

	});

	var dados = {
		placar: placar
	};

	//plugin para notificação
	//http://iamceege.github.io/tooltipster/
	$.post("http://localhost:3000/placar",dados,function(){
		console.log("salvo os dados no servidor");
		$(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sicronizar");;
	})
	.fail(()=>{
		$(".tooltip").tooltipster("open").tooltipster("content","Falha ao sicronizar");
	})
	.always(()=>{
		setTimeout(() => {
		  $(".tooltip").tooltipster("close");
		}, 1000);
	});
}


function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}