var tela = window.location.pathname;
if (tela == '/index.html') {
    $('.barra-de-navegacao').css("position", "absolute");
}
else {
    $('.barra-de-navegacao').css("background","linear-gradient(#064561, #2b6883)");
}