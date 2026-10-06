const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "LoginPage.html";
}

const formulario = document.querySelector(".form");
const lista = document.querySelector(".lista");
const alunoInput = document.querySelector("#aluno");
const turmaInput = document.querySelector("#turma");
const disciplinaInput = document.querySelector("#disciplina");
const professorInput = document.querySelector("#professor");
const dataInput = document.querySelector("#data");
const horarioInput = document.querySelector("#horario");
const duracaoInput = document.querySelector("#duracao");
const salaInput = document.querySelector("#sala");
const observacoesInput = document.querySelector("#observacoes");

function carregarAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    lista.innerHTML = "";

    if (agendamentos.length === 0) {
        lista.innerHTML = "<li class='item'><div class='meta'>Nenhum agendamento cadastrado.</div></li>";
        return;
    }

    agendamentos.forEach((agendamento, index) => {
        const item = document.createElement("li");
        item.className = "item";

        item.innerHTML = `
            <div class="topo-item">
                <div class="materia">${agendamento.disciplina}</div>
                <span class="tag">Confirmado</span>
            </div>

            <div class="meta">
                <div><strong>Aluno:</strong> ${agendamento.aluno}</div>
                <div><strong>Professor:</strong> ${agendamento.professor}</div>
                <div><strong>Turma:</strong> ${agendamento.turma}</div>
                <div><strong>Data:</strong> ${formatarData(agendamento.data)} • ${agendamento.horario}</div>
                <div><strong>Duração:</strong> ${agendamento.duracao}</div>
                <div><strong>Local:</strong> ${agendamento.sala}</div>
                ${agendamento.observacoes ? `<div><strong>Observações:</strong> ${agendamento.observacoes}</div>` : ""}
                <button type="button" class="botao botao-secundario" onclick="excluirAgendamento(${index})">
                    Excluir
                </button>
            </div>
        `;

        lista.appendChild(item);
    });
}

function formatarData(data) {
    if (!data) return "";
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!dataInput.value) {
        alert("Escolha uma data para o agendamento.");
        return;
    }

    const agendamento = {
        aluno: alunoInput.value.trim(),
        turma: turmaInput.value,
        disciplina: disciplinaInput.value,
        professor: professorInput.value,
        data: dataInput.value,
        horario: horarioInput.value,
        duracao: duracaoInput.value,
        sala: salaInput.value,
        observacoes: observacoesInput.value.trim(),
        usuario: usuarioLogado.email
    };

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    alert("Agendamento salvo com sucesso!");

    formulario.reset();
    alunoInput.value = "Falecido Moisés";

    carregarAgendamentos();
});

window.excluirAgendamento = function(index) {
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    if (confirm("Deseja excluir este agendamento?")) {
        agendamentos.splice(index, 1);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
        carregarAgendamentos();
    }
};

carregarAgendamentos();
