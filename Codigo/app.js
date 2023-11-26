//Encaminha para a pagina serviço de atendimento ao cliente
function RedirecionaSAC() {
    window.location.pathname = 'sac.html'
}

//Encaminha para a pagina politica de privacidade
function RedirecionaPolitica() {
    window.location.pathname = 'politices.html'

    var tela = window.location.pathname;
    if (tela == '/index.html' || tela == '/') {
        $('.barra-de-navegacao').css("position", "absolute");
    }
}

//Define qual o padrao de barra de navegação a ser utilizado
function SelecionaBarra() {
    var tela = window.location.pathname;
    if ((tela == '/index.html' || tela == '/') && (largura > 720)) {
        $('.barra-de-navegacao').css("position", "absolute");
    }
    else{
        $('.barra-de-navegacao').css("background", "var(--cor-barra-de-nav)");
    }
}

//Função para mostrar ou esconder o botão ao rolar a pagina
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $('#top').css("display", "block");
    } else {
        $('#top').css("display", "none");
    }
}

//Botão que encaminha para o topo da pagina
function RolaProTopo() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Função para puxar o endereço por cep
$('#estado').on('change',function(){
    var option = this.selectedOptions[0];
    var UF = option.value;
    $("#cidades").html(``)
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                $("#cidades").append(`<option value="${element.nome}">${element.nome}</option>`)
            });
        })
})

//Controle do botão do menu
$(".mobile-menu").click(function(){
    $(".menu-links").toggleClass("is-open");
    if($(".menu-links").hasClass("is-open")){
        $("#close").css("display","block");
        $(".botao-menu").css("display","none");
    }else{
        $("#close").css("display","none");
        $(".botao-menu").css("display","block");
    }
});

var largura = window.outerWidth;

var botao_topo = $("#top").html();
window.onscroll = function () { scrollFunction() };

SelecionaBarra();
$('.sac').on('click', RedirecionaSAC);
$('.politica').on('click', RedirecionaPolitica);

if (largura < 720){
    var video = `<iframe id="player" width="${largura}" height="315" src="https://www.youtube.com/embed/Hz8Ql8cMj4U?si=Ws1M84cAOQehcg8o&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <p class="video__texto"> Conheça um pouco sobre nós!!!</p>`
}else{
    var video = `<iframe id="player" width="560" height="315" src="https://www.youtube.com/embed/Hz8Ql8cMj4U?si=Ws1M84cAOQehcg8o&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <p class="video__texto"> Conheça um pouco sobre nós!!!</p>`
}
$("#video").html(video);
$("#video").css("padding","0.2rem");
