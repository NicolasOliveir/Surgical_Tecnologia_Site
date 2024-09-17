//variaveis
var largura = window.outerWidth;
var botao_topo = document.querySelector("#top");
var pagina = window.location.pathname;
var cidadesElement = document.querySelector("#cidades");
window.onscroll = function () { scrollFunction() };

//Encaminha para a pagina serviço de atendimento ao cliente
function RedirecionaSAC() {
    window.location.pathname = 'sac.html'
}
//Encaminha para a pagina politica de privacidade
function RedirecionaPolitica() {
    window.location.pathname = 'politices.html'
}
//Define qual o padrao de barra de navegação a ser utilizado
function SelecionaBarra() {
    var tela = window.location.pathname;
    if ((tela == '/index.html' || tela == '/') && (largura > 720)) {
        document.querySelector(".barra-de-navegacao").style.position = "absolute";
    }
    else {
        document.querySelector(".barra-de-navegacao").style.background = "var(--cor-barra-de-nav";
    }
}
//Função para mostrar ou esconder o botão ao rolar a pagina
function scrollFunction() {
    if(document.querySelector("#top") != null){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.querySelector("#top").style.display = "block";
        } else {
            document.querySelector("#top").style.display = "none";
        }
    }
}
//Botão que encaminha para o topo da pagina
function RolaProTopo() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//Função para adicionar o video do youtube de acordo com o dispositivo
function AdicionaVideo() {
    if (largura > 720) {
        var video = `
        <video autoplay id="video-apresentacao" class="scrollreveal" controlslist ="nodownload" mute controls><source src="./assets/apresentacao.mov" type="video/mp4"></video>
        <p class="video__texto"> Venha nos conhecer!!!</p>`
    } else {
        var video = `<p class="video__texto"> Venha nos conhecer!!!</p>
        <video autoplay id="video-apresentacao" class="scrollreveal" controlslist ="nodownload" mute controls><source src="./assets/apresentacao.mov" type="video/mp4"></video>`
    }

    document.querySelector("#video").innerHTML = video;
    document.querySelector("#video").style.padding = "0.2rem";
    
    var video = document.querySelector("#video-apresentacao");
    video.autoplay=true;
    setInterval(video.load(),10)
    video.load();
}
//Função de formatação do campo cpf no sac
function formatarCPF(input) {
    // Obtém o valor do input
    var valor = input.value;
    if (valor.length == 3 | valor.length == 7) {
        input.value = valor + '.';
    } else {
        if (valor.length == 11) {
            input.value = valor + '-';
        }
    }
}
//Função de chamada de envio de email
function enviarEmail() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "enviar-email.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}
//Função de pesquisa de cep
async function CEP() {
    cep = document.querySelector("#cep").value;
    const resultado = await fetch(`https://api.postmon.com.br/v1/cep/${cep}`).then(res => res.json());
    await pesquisaUF(resultado.estado);
    document.querySelector('#estado').value = resultado.estado;
    document.querySelector('#rua').value = resultado.logradouro;
    document.querySelector('#cidades').value = resultado.cidade;
    document.querySelector('#bairro').value = resultado.bairro;
}
//Função de pesquisa de estado
async function pesquisaUF(UF) {
    const cidadesElement = document.querySelector('#cidades');
    const data = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`).then((res) => res.json());
    data.forEach((element) => {
      var optionElement = document.createElement("option");
      optionElement.value = element.nome;
      optionElement.textContent = element.nome;
      cidadesElement.append(optionElement);
    });
}

function LimpaTela(){
    document.querySelector('.campos').reset();
}

//Controle do botão do menu
document.querySelector(".mobile-menu").addEventListener("click", function () {
    var menu = document.querySelector(".menu-links");
    menu.classList.toggle("is-open");
    if (menu.classList.contains("is-open")) {
        document.querySelector("#close").style.display = "block";
        document.querySelector(".botao-menu").style.display = "none";
        document.querySelector(".mobile-menu").style.position = "fixed";
    } else {
        document.querySelector("#close").style.display = "none";
        document.querySelector(".botao-menu").style.display = "block";
        document.querySelector(".mobile-menu").style.position = "static";
    }
})

SelecionaBarra();
if (pagina == "/index.html" || pagina == "/") {
    AdicionaVideo();
}
document.querySelector(".sac").addEventListener("click", RedirecionaSAC);
document.querySelector(".politica").addEventListener("click", RedirecionaPolitica);
if (pagina == "/sac.html") {
    document.querySelector(".envia-sac").addEventListener("click", enviarEmail);
}

if(pagina == '/orcamento.html'){
    document.querySelector('#botao-cep').addEventListener("click", CEP )
    document.querySelector(".form-orcamento-solicitar").addEventListener("click", enviarEmail);
}

if (pagina == "/sac.html" || pagina == "/orcamento.html") {
    document.querySelector("#estado").addEventListener("change", function () {
        if (cidadesElement.querySelector("option") != null) {
            let varios = cidadesElement.querySelectorAll("option");
            varios.forEach(element => {
                element.remove();
            });
        }
        var selectedOption = this.selectedOptions[0];
        var UF = selectedOption.value;
        pesquisaUF(UF);
    });
}



//Reveal

window.revelar= ScrollReveal()

revelar.reveal('.video__texto',{
    distance: '90px',
    duration: 1500,
    delay:250
})

revelar.reveal('.card1',{
    distance: '50px',
    duration: 1500,
    delay:500,
    origin: 'left',
})

revelar.reveal('.card2',{
    distance: '50px',
    duration: 1500,
    delay: 1000,
    origin: 'bottom'
})

revelar.reveal('.card3',{
    distance: '50px',
    duration: 1500,
    delay: 1500,
    origin: 'right'
})

revelar.reveal('#botao_servicos',{
    distance: '50px',
    duration: 1500,
    delay:250
})

revelar.reveal('.whatsapps-contato1',{
    distance: '50px',
    duration: 1500,
    delay: 750
})
revelar.reveal('.whatsapps-contato2',{
    distance: '50px',
    duration: 1500,
    delay: 1000
})
revelar.reveal('.whatsapps-expedicao',{
    distance: '50px',
    duration: 1500,
    delay: 1250
})
revelar.reveal('.whatsapps-planejamento',{
    distance: '50px',
    duration: 1500,
    delay: 1500
})