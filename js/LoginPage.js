const modal = document.querySelector('dialog');

function openModalCad() {
    modal.showModal();
}

function closeModalCad() {
    modal.close();
}

let nomeCadastro = document.querySelector("#nome-cadastro")
let LnomeCadastro = document.querySelector("#Lnome-cadastro")

let emailCadastro = document.querySelector("#email-cadastro")
let LemailCadastro = document.querySelector("#Lemail-cadastro")

let senhaCadastro = document.querySelector("#senha-cadastro")
let LsenhaCadastro = document.querySelector("#Lsenha-cadastro")
const mostrarSenha = document.getElementById("mostrarSenha");


nomeCadastro.addEventListener("input", () => {

    if (/[^a-zA-ZÀ-ÿ\s´~^]/.test(nomeCadastro.value)) {

        LnomeCadastro.style.color = "red";
        LnomeCadastro.innerHTML =
            "<strong>Não é permitido usar números ou símbolos.</strong>";
        nomeCadastro.style.borderColor = "red";

    } else if (nomeCadastro.value.length <= 4) {

        LnomeCadastro.style.color = "red";
        LnomeCadastro.innerHTML =
            "<strong>Mínimo 5 caracteres</strong>";
        nomeCadastro.style.borderColor = "red";

    } else {

        LnomeCadastro.innerHTML = "Nome";
        LnomeCadastro.style.color = "green";
        nomeCadastro.style.borderColor = "green";

    }
});

emailCadastro.addEventListener("input", () => {

    if (!emailCadastro.value.includes("@")) {

        LemailCadastro.style.color = "red";
        LemailCadastro.innerHTML =
            "<strong>Digite um e-mail válido.</strong>";
        emailCadastro.style.borderColor = "red";

    } else if (!emailCadastro.value.includes(".com")) {

        LemailCadastro.style.color = "red";
        LemailCadastro.innerHTML =
            "<strong>Digite um e-mail válido.</strong>";
        emailCadastro.style.borderColor = "red";

    } else {

        LemailCadastro.innerHTML = "E-mail";
        LemailCadastro.style.color = "green";
        emailCadastro.style.borderColor = "green";

    }
});

senhaCadastro.addEventListener("input", () => {

    if (senhaCadastro.value.length < 7) {

        LsenhaCadastro.style.color = "red";
        LsenhaCadastro.innerHTML =
            "<strong>Mínimo 7 caracteres.</strong>";
        senhaCadastro.style.borderColor = "red";

    } else if (!/[A-Za-z]/.test(senhaCadastro.value)) {

        LsenhaCadastro.style.color = "red";
        LsenhaCadastro.innerHTML =
            "<strong>A senha deve ter pelo menos uma letra.</strong>";
        senhaCadastro.style.borderColor = "red";

    } else if (!/[0-9]/.test(senhaCadastro.value)) {

        LsenhaCadastro.style.color = "red";
        LsenhaCadastro.innerHTML =
            "<strong>A senha deve ter pelo menos um número.</strong>";
        senhaCadastro.style.borderColor = "red";

    } else {

        LsenhaCadastro.innerHTML = "Senha";
        LsenhaCadastro.style.color = "green";
        senhaCadastro.style.borderColor = "green";

    }
});

mostrarSenha.addEventListener("click", () => {

    if (senhaCadastro.type === "password") {
        senhaCadastro.type = "text";
        mostrarSenha.innerHTML = "👁️";
    } else {
        senhaCadastro.type = "password";
        mostrarSenha.innerHTML = "👁️";
    }

});


function cadastrar(event) {

    event.preventDefault();

    if (
        nomeCadastro.value.length >= 5 &&
        !/[^a-zA-ZÀ-ÿ\s´~^]/.test(nomeCadastro.value) &&
        emailCadastro.value.includes("@") &&
        emailCadastro.value.includes(".com") &&
        senhaCadastro.value.length >= 7 &&
        /[A-Za-z]/.test(senhaCadastro.value) &&
        /[0-9]/.test(senhaCadastro.value)
    ) {

        const usuario = {
            nome: nomeCadastro.value,
            email: emailCadastro.value,
            senha: senhaCadastro.value
        };

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        nomeCadastro.value = "";
        emailCadastro.value = "";
        senhaCadastro.value = "";


        alert("Cadastro criado com sucesso!");

        document.getElementById("dialog").close();

    } else {

        alert("Preencha todos os campos corretamente.");

    }
}
