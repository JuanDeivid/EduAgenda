const modal = document.querySelector("dialog");

function openModalCad() {
    modal.showModal();
}

function closeModalCad() {
    modal.close();
}

//CADASTRO
const nomeCadastro = document.querySelector("#nome-cadastro");
const LnomeCadastro = document.querySelector("#Lnome-cadastro");

const emailCadastro = document.querySelector("#email-cadastro");
const LemailCadastro = document.querySelector("#Lemail-cadastro");

const senhaCadastro = document.querySelector("#senha-cadastro");
const LsenhaCadastro = document.querySelector("#Lsenha-cadastro");

const mostrarSenha = document.querySelector("#mostrarSenha");

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
    } else {
        senhaCadastro.type = "password";
    }

});

function cadastrar(event) {

    event.preventDefault();

    const nome = nomeCadastro.value.trim();
    const email = emailCadastro.value.trim();
    const senha = senhaCadastro.value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    const emailJaCadastrado = usuarios.some(usuario =>
        usuario.email === email
    );

    if (emailJaCadastrado) {

        alert("Este e-mail já está cadastrado.");
        return;

    }

    if (
        nome.length >= 5 &&
        !/[^a-zA-ZÀ-ÿ\s´~^]/.test(nome) &&
        email.includes("@") &&
        email.includes(".com") &&
        senha.length >= 7 &&
        /[A-Za-z]/.test(senha) &&
        /[0-9]/.test(senha)
    ) {

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        usuarios.push(usuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        nomeCadastro.value = "";
        emailCadastro.value = "";
        senhaCadastro.value = "";

        alert("Cadastro criado com sucesso!");

        modal.close();

    } else {

        alert("Preencha todos os campos corretamente.");

    }
}

// LOGIN

function logar(event) {

    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];


    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.nome === nome &&
        usuario.email === email &&
        usuario.senha === senha
    );


    if (!usuarioEncontrado) {

        alert("Nome, e-mail ou senha incorretos.");
        return;

    }


    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioEncontrado)
    );

    window.location.href = "Inicio.html";
}

