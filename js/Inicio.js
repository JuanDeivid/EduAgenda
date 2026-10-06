const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "LoginPage.html";
} else {
    const boasVindas = document.querySelector(".boas-vindas h2");

    if (boasVindas) {
        boasVindas.textContent = `Olá, ${usuarioLogado.nome}!`;
    }
}
