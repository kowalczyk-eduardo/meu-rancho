import Usuario from "../../model/Usuario.js";
import UsuarioService from "../../service/UsuarioService.js";

const form  = document.getElementById("formCadastro");
const senha = document.getElementById("senha");

const service = new UsuarioService();

// ── Helpers de erro inline ───────────────────────────────────────────────────
function exibirErro(input, mensagem) {
    input.classList.add("is-invalid");

    let feedback = input.closest(".input-group").nextElementSibling;
    if (!feedback || !feedback.classList.contains("invalid-feedback")) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        input.closest(".input-group").insertAdjacentElement("afterend", feedback);
    }

    feedback.textContent = mensagem;
    feedback.style.display = "block";
}

function limparErro(input) {
    input.classList.remove("is-invalid");
    const feedback = input.closest(".input-group").nextElementSibling;
    if (feedback?.classList.contains("invalid-feedback")) {
        feedback.style.display = "none";
    }
}

// ── Limpa erro ao digitar ────────────────────────────────────────────────────
["nome", "email", "senha"].forEach((id) => {
    document.getElementById(id).addEventListener("input", function () {
        limparErro(this);
    });
});

// ── Validação de senha ao sair do campo ─────────────────────────────────────
senha.addEventListener("blur", () => {
    const valor = senha.value;
    if (!valor) return;

    if (valor.length < 8) {
        exibirErro(senha, "A senha deve possuir pelo menos 8 caracteres.");
    } else if (!/[A-Z]/.test(valor)) {
        exibirErro(senha, "A senha deve possuir uma letra maiúscula.");
    } else if (!/[a-z]/.test(valor)) {
        exibirErro(senha, "A senha deve possuir uma letra minúscula.");
    } else if (!/\d/.test(valor)) {
        exibirErro(senha, "A senha deve possuir um número.");
    }
});

// ── Submit do formulário ─────────────────────────────────────────────────────
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const valor = senha.value;
    let valido = true;

    if (inputNome.value.trim().length < 4) {
        exibirErro(inputNome, "O nome deve ter pelo menos 4 caracteres.");
        valido = false;
    }

    if (!inputEmail.value.trim()) {
        exibirErro(inputEmail, "Informe um e-mail válido.");
        valido = false;
    }

    if (valor.length < 8) {
        exibirErro(senha, "A senha deve possuir pelo menos 8 caracteres.");
        valido = false;
    } else if (!/[A-Z]/.test(valor)) {
        exibirErro(senha, "A senha deve possuir uma letra maiúscula.");
        valido = false;
    } else if (!/[a-z]/.test(valor)) {
        exibirErro(senha, "A senha deve possuir uma letra minúscula.");
        valido = false;
    } else if (!/\d/.test(valor)) {
        exibirErro(senha, "A senha deve possuir um número.");
        valido = false;
    }

    if (!valido) return;

    const usuario = new Usuario(
        inputNome.value.trim(),
        inputEmail.value.trim(),
        valor
    );

    try {
        await service.cadastrar(usuario);
        window.location.href = "../login/index.html";
    } catch {
        exibirErro(inputEmail, "Não foi possível criar a conta. Verifique se o json-server está rodando.");
    }
});