function RedirecionaSAC(){
    window.location.pathname = 'sac.html'
} 

function RedirecionaPolitica(){
    window.location.pathname = 'politices.html'
}

function SelecionaBarra(){
    var tela = window.location.pathname;
    if (tela == '/index.html') {
        $('.barra-de-navegacao').css("position", "absolute");
    }
    else {
        $('.barra-de-navegacao').css("background","linear-gradient(#064561, #2b6883)");
    }
}

function scrollFunction(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $('#top').css("display", "block");
      } else {
        $('#top').css("display", "none");
      }
}

function RolaProTopo(){
    document.body.scrollTop = 0 ;
    document.documentElement.scrollTop= 0 ;
}

SelecionaBarra();
$('.sac').on('click',RedirecionaSAC);
$('.politica').on('click',RedirecionaPolitica);

var tela = window.location.pathname;
if (tela == '/index.html'|| tela =='/') {
    $('.barra-de-navegacao').css("position", "absolute");
}

$('#estado').on('change',function(){
    var option = this.selectedOptions[0];
    var UF = option.value;
    $("#cidades").html(``)
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        data.forEach(element => {
            $("#cidades").append(`<option value="${element.nome}">${element.nome}</option>`)
        });
    })
})

var botao_topo = $("#top").html();
window.onscroll = function(){scrollFunction()};
